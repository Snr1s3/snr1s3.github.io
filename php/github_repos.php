<?php
// filepath: /home/sunrise/Proj/snr1s3.github.io/php/github_repos.php

    $username = "Snr1s3";
    $url = "https://api.github.com/users/$username/repos?per_page=100";

    // GitHub API requires a User-Agent header
    $options = [
        "http" => [
            "header" => "User-Agent: PHP\r\n"
        ]
    ];
    $context = stream_context_create($options);
    $json = file_get_contents($url, false, $context);
    $repos = json_decode($json, true);

    $repo_list = [];
    foreach ($repos as $repo) {
        $repo_list[] = [
            "name" => $repo["name"],
            "desc" => $repo["description"] ?? "",
            "url" => $repo["html_url"],
            "photo" => "https://via.placeholder.com/300x200?text=" . urlencode($repo["name"])
        ];
    }

    file_put_contents("../json/projects.json", json_encode($repo_list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo "Done!\n";
?>