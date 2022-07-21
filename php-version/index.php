<?php

require __DIR__ . '/vendor/autoload.php';

use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

$connector = new FilePrintConnector('/dev/usb/lp0');
$printer = new Printer($connector);

$printer->text('Hej verden');
$printer->feed(2);
$printer->cut();
$printer->close();

?>

