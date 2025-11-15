<?php
$url = isset($_GET['url']) ? $_GET['url'] : '';
if(!$url){ echo "Error: Missing URL"; exit; }

// مجلد الكاش
$cache_file = __DIR__ . "/cache.txt";
$cache_time = 60; // 60 ثانية

if(file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_time)){
    $data = file_get_contents($cache_file);
}else{
    $data = @file_get_contents($url);
    if($data === FALSE){ echo "Error: Cannot fetch data"; exit; }
    file_put_contents($cache_file, $data);
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=utf-8");
echo $data;
?>