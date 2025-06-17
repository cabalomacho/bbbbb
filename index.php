<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'restaurante';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro de conexão: ' . $e->getMessage()]);
    exit;
}
?>

<?php
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $conn->prepare("INSERT INTO reservas (nome, email, telefone, data_reserva, hora_reserva, pessoas, mensagem) 
                               VALUES (:nome, :email, :telefone, :data_reserva, :hora_reserva, :pessoas, :mensagem)");
        
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telefone', $data['telefone']);
        $stmt->bindParam(':data_reserva', $data['data']);
        $stmt->bindParam(':hora_reserva', $data['hora']);
        $stmt->bindParam(':pessoas', $data['pessoas']);
        $stmt->bindParam(':mensagem', $data['mensagem']);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Reserva realizada com sucesso!']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erro ao fazer reserva: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?>

<?php
require_once 'conexao.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $conn->prepare("INSERT INTO contatos (nome, email, assunto, mensagem) 
                               VALUES (:nome, :email, :assunto, :mensagem)");
        
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':assunto', $data['assunto']);
        $stmt->bindParam(':mensagem', $data['mensagem']);
        
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?>

