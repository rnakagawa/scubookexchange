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
        public $ed;
        public $isbn;
        public $image;
    	public function __construct($title, $author, $ed, $isbn, $image){
            $this->title=$title;
    		$this->author = $author;
            $this->ed = $ed;
    		$this->isbn = $isbn;
            $this->image = $image;
    	}
    }
    $results=[];
    $size=$xml->Items->Item->count();
    $i=0;
    while($i < $size && $i < 50){
        if(strcmp($xml->Items->Item[$i]->ItemAttributes->EAN, '')!=0){
            $author=$xml->Items->Item[$i]->ItemAttributes->Author;
    		$title=$xml->Items->Item[$i]->ItemAttributes->Title;
    		$isbn=$xml->Items->Item[$i]->ItemAttributes->EAN;
            $image=$xml->Items->Item[$i]->MediumImage->URL;
            $ed=$xml->Items->Item[$i]->ItemAttributes->Edition;
        	$results[$i] = new result($title, $author, $ed, $isbn, $image);
            $i++;
        }
        else
            $i++;
    }
    print_R(json_encode($results));

?>
