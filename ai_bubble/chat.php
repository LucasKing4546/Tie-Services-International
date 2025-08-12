<?php
// chat.php - Pure PHP version for XAMPP
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get and validate input
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON format']);
    exit();
}

if (!isset($input['contents']) || !is_array($input['contents'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid "contents" format']);
    exit();
}

$contents = $input['contents'];
$apiUrl = 'https://lucasking4546--ai-chatbot-serve-api.modal.run/chat';

// Prepare the request
$postData = json_encode(['contents' => $contents]);

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postData)
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($error) {
    http_response_code(response_code: 500);
    echo json_encode([
        'error' => 'Connection error to AI service',
        'detail' => $error
    ]);
    exit();
}

// Handle HTTP errors
if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode([
        'error' => 'AI service returned error',
        'http_code' => $httpCode,
        'response' => $response
    ]);
    exit();
}

// Validate response
$decodedResponse = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid response from AI service']);
    exit();
}

// Return the response
echo $response;
?>