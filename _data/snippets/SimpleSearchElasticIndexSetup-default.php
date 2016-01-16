id: 48
name: SimpleSearchElasticIndexSetup_default
description: 'Setup snippet for ElasticSearch index'
category: SimpleSearch
properties: null

-----

$indexSetup = array(
    'number_of_shards' => 5,
    'number_of_replicas' => 1,
    'analysis' => array(
        'analyzer' => array(
            'default_index' => array(
                "type" => "custom",
                "tokenizer" => "whitespace",
                "filter" => array(
                    "asciifolding",
                    "standard",
                    "lowercase",
                    "haystack_edgengram"
                )
            ),
            'default_search' => array(
                "type" => "custom",
                "tokenizer" => "whitespace",
                "filter" => array(
                    "asciifolding",
                    "standard",
                    "lowercase"
                )
            )
        ),
        "filter" => array(
            "haystack_ngram" => array(
                "type" => "nGram",
                "min_gram" => 2,
                "max_gram" => 30,
            ),
            "haystack_edgengram" => array(
                "type" => "edgeNGram",
                "min_gram" => 2,
                "max_gram" => 30,
            )
        )
    )
);

return $modx->toJSON($indexSetup);