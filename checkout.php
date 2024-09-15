<?php
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$amount = $data['money'];
$paymenttype = $data['type'];

$amount_money = new \Square\Models\Money();
$amount_money->setAmount($amount);
$amount_money->setCurrency('JPY');

$device_options = new \Square\Models\DeviceCheckoutOptions('dbb5d83a-7838-11ea-bc55-0242ac130003');

$checkout = new \Square\Models\TerminalCheckout($amount_money, $device_options);
$checkout->setPaymentType($paymenttype);

$body = new \Square\Models\CreateTerminalCheckoutRequest('28a0c3bc-7839-11ea-bc55-0242ac130003', $checkout);

$api_response = $client->getTerminalApi()->createTerminalCheckout($body);

if ($api_response->isSuccess()) {
    $result = $api_response->getResult();
    echo json_encode(['status' => 'success', 'result' => $result]);
} else {
    $errors = $api_response->getErrors();
    echo json_encode(['status' => 'error', 'errors' => $errors]);
}