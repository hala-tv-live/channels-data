<?php
$input = isset($_GET['url']) ? $_GET['url'] : '';
if(!$input){ echo "Error: Missing video URL"; exit; }

$live_dir = __DIR__ . "/live/";
if(!is_dir($live_dir)){ mkdir($live_dir, 0777, true); }

$playlist = $live_dir . "stream.m3u8";

// أمر FFmpeg لتحويل أي TS أو MP4 إلى HLS
$cmd = "ffmpeg -y -i \"$input\" -c:v libx264 -c:a aac -f hls -hls_time 6 -hls_list_size 5 -hls_flags delete_segments \"$playlist\"";

exec($cmd, $output, $return_var);
if($return_var !== 0){
    echo "FFmpeg error: " . implode("\n", $output);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=utf-8");
echo "live/stream.m3u8";
?>