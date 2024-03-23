<?php

class SubscripcioModel {
    private $host = "localhost";
    private $puerto = 27017;
    private $baseDatos = "ASMA";
    private $coleccion = "subscripcions";
    private $user = ""; // Actualizar si es necesario
    private $password = ""; // Actualizar si es necesario
    private $conexion;

    public function __construct() {
        $this->conectar();
        $this->readParams();
    }

    public function readParams() {
        // Verifica si hay parámetros en la URL
        if (isset($_GET) && !empty($_GET)) {
            // Si existe el metodo
            if(method_exists($this, $_GET['method'])){
                $this->{$_GET['method']}($_GET['params']);
            }
        } else {
            // Retorna un arreglo vacío si no hay parámetros
            this->enviarRespuestaJSON([]);
        }
    }

    private function conectar() {
        try {
            $this->conexion = new MongoDB\Driver\Manager("mongodb://{$this->host}:{$this->puerto}");
            // Conexión exitosa a MongoDB (no se retorna mensaje de éxito en producción)
        } catch (MongoDB\Driver\Exception\Exception $e) {
            //return $response = ['error' => true, 'mensaje' => "Error de conexión: " . $e->getMessage()];
            return $response = ['error' => true, 'mensaje' => "Error de connexió a la base de dades."];
        }
    }

    public function insertarDocumento($documento) {
        try {
            $bulk = new MongoDB\Driver\BulkWrite;
            $id = $bulk->insert($documento);

            $resultado = $this->conexion->executeBulkWrite("{$this->baseDatos}.{$this->coleccion}", $bulk);

            if ($resultado->getInsertedCount() > 0) {
                //return ['error' => false, 'mensaje' => "Documento insertado correctamente.", 'id' => (string) $id];
                return ['error' => false, 'mensaje' => "La seva sol·licitud s'ha processat correctament."];

            } else {
                //return ['error' => true, 'mensaje' => "Error al insertar el documento."];
                return ['error' => true, 'mensaje' => "La seva sol·licitud no s'ha processat correctament."];

            }
        } catch (MongoDB\Driver\Exception\Exception $e) {
            //$this->enviarRespuestaJSON(['error' => true, 'mensaje' => "Error al insertar: " . $e->getMessage()]);
            //return ['error' => true, 'mensaje' => "Error al insertar: " . $e->getMessage()];
            return ['error' => true, 'mensaje' => "La seva sol·licitud no s'ha processat."];

        }
    }

    public function find($id){
        $conversion = ["_id" => new MongoDB\BSON\ObjectId($id)];
        // Crear query
        $query = new MongoDB\Driver\Query($conversion);
        // Ejecutar la consulta
        $cursor = $this->conexion->executeQuery($this->baseDatos . "." . $this->coleccion, $query);

        // Iterar sobre los resultados
        $resultados = [];
        foreach ($cursor as $documento) {
            $resultados[] = $documento;
        }

        // Devolver los resultados
        if(empty($resultados)) {
            $this->enviarRespuestaJSON([]);
        }else{
            $this->enviarRespuestaJSON($resultados);
        }
    }
    
    public function getAllUsers() {
        try {
            $consulta = new MongoDB\Driver\Query([]);
            $cursor = $this->conexion->executeQuery("{$this->baseDatos}.{$this->coleccion}", $consulta);
            $documentos = [];

            foreach ($cursor as $documento) {
                $documentos[] = $documento;
            }

            $this->enviarRespuestaJSON($documentos);

        } catch (MongoDB\Driver\Exception\Exception $e) {
            //$this->enviarRespuestaJSON(['error' => true, 'mensaje' => "Error al consultar documentos: " . $e->getMessage()]);
            $this->enviarRespuestaJSON($e->getMessage());
        }
    }

    private function enviarRespuestaJSON($respuesta) {
        header('Content-Type: application/json');
        echo json_encode($respuesta);
    }
}

$api = new SubscripcioModel();
//$api->mostrarDocumentos();