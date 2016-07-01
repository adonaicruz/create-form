<?php
	header('Content-Type: application/json');
	if($_POST['token'] === '62bb61431348e22850828a5829c4373faafe29c1' && $_POST['secret'] === "51a266c2844ccd5cac83d88de88d82d05358aa51" && $_POST['lead']['name'] && $_POST['lead']['email']){
		$jsonData = json_encode($_POST);

		$response = array('success'=>true);
		http_response_code(200);
	}else{
		$response = array('success'=>false);
		http_response_code(500);
	}
	echo json_encode($response);