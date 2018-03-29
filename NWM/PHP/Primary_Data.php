<?php

$Date = $_GET['DATE'];
$ABV = $_GET['ABV'];
$BEER = $_GET['BEER'];
$Parameters = "per_page=80";

//https://github.com/toddmotto/public-apis#food--drink
//PunkAPI https://punkapi.com/
//https://punkapi.com/documentation/v2
if ($Date !== "") {
    $Parameters .= "&brewed_before=" . $Date;
}
if ($ABV !== "") {
    $Parameters .= "&abv_gt=" . $ABV;
}
if ($BEER !== "") {
    $Parameters .= "&beer_name=" . $BEER;
}
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.punkapi.com/v2/beers?$Parameters");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>