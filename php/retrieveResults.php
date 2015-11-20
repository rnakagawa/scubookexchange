<?php

$xmlString=$_GET['xml'];
echo $xmlString;
	// var_dump(libxml_use_internal_errors(true));
	$xmlString=preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $xmlString);
	$xml = simplexml_load_string($xmlString);

	foreach (libxml_get_errors() as $error) {
		print_r($error);
    }

    class result{
        public $title;
        public $author;
        public $ed;
        public $isbn;
    	public function __construct($title, $author, $ed, $isbn){
    		$this->title = $title;
    		$this->author = $author;
    		$this->ed = $ed;
    		$this->isbn = $isbn;
    	}
    }
    $results=[];
    for($i = 0; $i < sizeof($xml->Items); $i++){
      $author=$xml->Items->Item->ItemAttributes->Author;
		$title=$xml->Items->Item->ItemAttributes->Title;
		$isbn=$xml->Items->Item->ItemAttributes->ISBN;
		$ed=$xml->Items->Item->ItemAttributes->Edition;
    	$results[$i] = new result($title, $author, $ed, $isbn);
    }
    echo json_encode($results);

?>
