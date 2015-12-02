<?php


    // function takes in a 13 digit ISBN number
    $isbn = $_GET['isbn'];
    $return_value = searchByISBN($isbn);
    print_R($return_value);

    function searchByISBN($isbn_number)
    {
        require "aws_config.php";        
        //**** Set constant values***\\

        $uri = "/onca/xml";

        // These are the search parameters
        $params = array(
                        "Service" => "AWSECommerceService",
                        "Operation" => "ItemLookup",
                        "AWSAccessKeyId" => "$aws_access_key_id",
                        "AssociateTag" => "$associate_tag",
                        "ItemId" => "$isbn_number",
                        "ResponseGroup" => "Large",
                        "IdType" => "ISBN",
                        "SearchIndex" => "Books"
                        );

        // Set current timestamp if not set
        if (!isset($params["Timestamp"])) {
            $params["Timestamp"] = gmdate('Y-m-d\TH:i:s\Z');
        }

        // Sort the parameters by key
        ksort($params);

        $pairs = array();

        foreach ($params as $key => $value) {
            array_push($pairs, rawurlencode($key)."=".rawurlencode($value));
        }


        // Generate the canonical query
        $canonical_query_string = join("&", $pairs);

        // Generate the string to be signed
        $string_to_sign = "GET\n".$endpoint."\n".$uri."\n".$canonical_query_string;

        // Generate the signature required by the Product Advertising API
        $signature = base64_encode(hash_hmac("sha256", $string_to_sign, $aws_secret_key, true));

        // Generate the signed URL
        $request_url = 'http://'.$endpoint.$uri.'?'.$canonical_query_string.'&Signature='.rawurlencode($signature);


       // echo "Signed URL: \"".$request_url."\"";


        $response_xml_data = file_get_contents($request_url);
        libxml_use_internal_errors(true);
        $data = simplexml_load_string($response_xml_data);

		return ($response_xml_data);
        // return ($data);

    }


?>
