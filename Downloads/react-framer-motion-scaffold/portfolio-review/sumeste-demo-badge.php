<?php
ob_start(function ($html) {
  if (stripos($html, '</body>') === false) return $html;
  $badge = '<div style="position:fixed;bottom:12px;right:12px;z-index:99999;border:1px solid #15803d;border-radius:999px;background:#fff;color:#166534;padding:7px 12px;font:600 11px Arial,sans-serif;box-shadow:0 2px 8px #0001">Portfolio preview · Demo data</div>';
  return str_ireplace('</body>', $badge . '</body>', $html);
});
