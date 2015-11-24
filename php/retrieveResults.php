<?php

	$xmlString=$_POST['xml'];
	// var_dump(libxml_use_internal_errors(true));
	$xmlString=preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', $xmlString);
	$xml = simplexml_load_string($xmlString);

	foreach (libxml_get_errors() as $error) {
		print_r($error);
    }

    class result{
        public $title;
        public $author;
        public $isbn;
    	public function __construct($title, $author, $isbn){
    		$this->title = $title;
    		$this->author = $author;
    		$this->isbn = $isbn;
    	}
    }
    $results=[];
    $size=$xml->Items->Item->count();
    $i=0;
    while($i < $size && $i < 50){
        $author=$xml->Items->Item[$i]->ItemAttributes->Author;
		$title=$xml->Items->Item[$i]->ItemAttributes->Title;
		$isbn=$xml->Items->Item[$i]->ItemAttributes->EAN;
    	$results[$i] = new result($title, $author, $isbn);
        $i++;
    }
    print_R(json_encode($results));

?>
