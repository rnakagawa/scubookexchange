<?php
    // 9780132916547  COEN 20
    // 9780201163209  Random Caclulus Book

    // function takes in a 13 digit ISBN number

    // $return_value = searchByISBN(9780132916547);
    // print_R($return_value);
    $isbn_number=$_GET['isbn'];
    echo $isbn_number;
    function searchByISBN($isbn_number)
    {
        //**** Set constant values***\\

        // Your AWS Access Key ID, as taken from the AWS Your Account page
        $aws_access_key_id = "AKIAJ4ZRAGQGSNFYF3PQ";

        // Your AWS Secret Key corresponding to the above ID, as taken from the AWS Your Account page
        $aws_secret_key = "xlqLKC7XpfN3VCilAQ4k4Qtj3SWvl7qRuncf5BWT";

        // AWS Associate Name
        $associate_tag = "scu0bb-20";

        // The region you are interested in
        $endpoint = "webservices.amazon.com";





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
        echo $data;
        return($data);

    }


?>
