<?php
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.1.9 - Free Licence
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2011 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/

if (!isset($GLOBALS['vbulletin']->db))
{
	exit;
}

// the words from $vbulletin->options[goodwords] WILL be included in the Search Index
$vbulletin->options['goodwords'] = trim($vbulletin->options['goodwords']);
if ($vbulletin->options['goodwords'])
{
	$goodwords = preg_split('#[ \r\n\t]+#s', strtolower($vbulletin->options['goodwords']), -1, PREG_SPLIT_NO_EMPTY);
}
else
{
	$goodwords = array();
}

// these words will NOT be included in the Search Index
$badwords = array(
	'&amp',
	'&quot',
	'a',
	'able',
	'about',
	'above',
	'according',
	'accordingly',
	'across',
	'actually',
	'after',
	'afterwards',
	'again',
	'against',
	'aint',
	'all',
	'allow',
	'allows',
	'almost',
	'alone',
	'along',
	'already',
	'also',
	'although',
	'always',
	'am',
	'among',
	'amongst',
	'an',
	'and',
	'another',
	'any',
	'anybody',
	'anyhow',
	'anyone',
	'anything',
	'anyway',
	'anyways',
	'anywhere',
	'apart',
	'appear',
	'appreciate',
	'appropriate',
	'are',
	'arent',
	'around',
	'as',
	'aside',
	'ask',
	'asking',
	'associated',
	'at',
	'available',
	'away',
	'awfully',
	'b',
	'be',
	'became',
	'because',
	'become',
	'becomes',
	'becoming',
	'been',
	'before',
	'beforehand',
	'behind',
	'being',
	'believe',
	'below',
	'beside',
	'besides',
	'best',
	'better',
	'between',
	'beyond',
	'both',
	'brief',
	'but',
	'by',
	'c',
	'came',
	'can',
	'cannot',
	'cant',
	'cause',
	'causes',
	'certain',
	'certainly',
	'changes',
	'clearly',
	'cmon',
	'co',
	'com',
	'come',
	'comes',
	'concerning',
	'consequently',
	'consider',
	'considering',
	'contain',
	'containing',
	'contains',
	'corresponding',
	'could',
	'couldnt',
	'course',
	'cs',
	'currently',
	'd',
	'definitely',
	'described',
	'despite',
	'did',
	'didnt',
	'different',
	'do',
	'does',
	'doesnt',
	'doing',
	'done',
	'dont',
	'down',
	'downwards',
	'during',
	'e',
	'each',
	'edu',
	'eg',
	'eight',
	'either',
	'else',
	'elsewhere',
	'enough',
	'entirely',
	'especially',
	'et',
	'etc',
	'even',
	'ever',
	'every',
	'everybody',
	'everyone',
	'everything',
	'everywhere',
	'ex',
	'exactly',
	'example',
	'except',
	'f',
	'far',
	'few',
	'fifth',
	'first',
	'five',
	'followed',
	'following',
	'follows',
	'for',
	'former',
	'formerly',
	'forth',
	'four',
	'from',
	'further',
	'furthermore',
	'g',
	'get',
	'gets',
	'getting',
	'given',
	'gives',
	'go',
	'goes',
	'going',
	'gone',
	'got',
	'gotten',
	'greetings',
	'h',
	'had',
	'hadnt',
	'happens',
	'hardly',
	'has',
	'hasnt',
	'have',
	'havent',
	'having',
	'he',
	'hello',
	'help',
	'hence',
	'her',
	'here',
	'heres',
	'hereafter',
	'hereby',
	'herein',
	'hereupon',
	'hers',
	'herself',
	'hes',
	'hi',
	'him',
	'himself',
	'his',
	'hither',
	'hopefully',
	'how',
	'howbeit',
	'however',
	'i',
	'id',
	'ie',
	'if',
	'ignored',
	'ill',
	'im',
	'immediate',
	'in',
	'inasmuch',
	'inc',
	'indeed',
	'indicate',
	'indicated',
	'indicates',
	'inner',
	'insofar',
	'instead',
	'into',
	'inward',
	'is',
	'isnt',
	'ist',
	'it',
	'itd',
	'itll',
	'its',
	'itself',
	'ive',
	'j',
	'just',
	'k',
	'keep',
	'keeps',
	'kept',
	'know',
	'knows',
	'known',
	'l',
	'last',
	'lately',
	'later',
	'latter',
	'latterly',
	'least',
	'less',
	'lest',
	'let',
	'lets',
	'like',
	'liked',
	'likely',
	'little',
	'look',
	'looking',
	'looks',
	'ltd',
	'm',
	'mainly',
	'many',
	'may',
	'maybe',
	'me',
	'mean',
	'meanwhile',
	'merely',
	'might',
	'more',
	'moreover',
	'most',
	'mostly',
	'much',
	'must',
	'my',
	'myself',
	'n',
	'name',
	'namely',
	'nd',
	'near',
	'nearly',
	'necessary',
	'need',
	'needs',
	'neither',
	'never',
	'nevertheless',
	'new',
	'next',
	'nine',
	'no',
	'nobody',
	'non',
	'none',
	'noone',
	'nor',
	'normally',
	'not',
	'nothing',
	'novel',
	'now',
	'nowhere',
	'o',
	'obviously',
	'of',
	'off',
	'often',
	'oh',
	'ok',
	'okay',
	'old',
	'on',
	'once',
	'one',
	'ones',
	'only',
	'onto',
	'or',
	'originally',
	'other',
	'others',
	'otherwise',
	'ought',
	'our',
	'ours',
	'ourselves',
	'out',
	'outside',
	'over',
	'overall',
	'own',
	'p',
	'particular',
	'particularly',
	'per',
	'perhaps',
	'placed',
	'please',
	'plus',
	'possible',
	'posted',
	'presumably',
	'probably',
	'provides',
	'q',
	'que',
	'quite',
	'quote',
	'qv',
	'r',
	'rather',
	'rd',
	're',
	'really',
	'reasonably',
	'regarding',
	'regardless',
	'regards',
	'relatively',
	'respectively',
	'right',
	's',
	'said',
	'same',
	'saw',
	'say',
	'saying',
	'says',
	'second',
	'secondly',
	'see',
	'seeing',
	'seem',
	'seemed',
	'seeming',
	'seems',
	'seen',
	'self',
	'selves',
	'sensible',
	'sent',
	'seriously',
	'seven',
	'several',
	'shall',
	'she',
	'should',
	'shouldnt',
	'since',
	'six',
	'so',
	'some',
	'somebody',
	'somehow',
	'someone',
	'something',
	'sometime',
	'sometimes',
	'somewhat',
	'somewhere',
	'soon',
	'sorry',
	'specified',
	'specify',
	'specifying',
	'still',
	'sub',
	'such',
	'sup',
	'sure',
	't',
	'take',
	'taken',
	'tell',
	'tends',
	'th',
	'than',
	'thank',
	'thanks',
	'thanx',
	'that',
	'thats',
	'the',
	'their',
	'theirs',
	'them',
	'themselves',
	'then',
	'thence',
	'there',
	'theres',
	'thereafter',
	'thereby',
	'therefore',
	'therein',
	'theres',
	'thereupon',
	'these',
	'they',
	'theyd',
	'theyll',
	'theyre',
	'theyve',
	'think',
	'third',
	'this',
	'thorough',
	'thoroughly',
	'those',
	'though',
	'three',
	'through',
	'throughout',
	'thru',
	'thus',
	'to',
	'together',
	'too',
	'took',
	'toward',
	'towards',
	'tried',
	'tries',
	'truly',
	'try',
	'trying',
	'ts',
	'twice',
	'two',
	'u',
	'un',
	'under',
	'unfortunately',
	'unless',
	'unlikely',
	'until',
	'unto',
	'up',
	'upon',
	'us',
	'use',
	'used',
	'useful',
	'uses',
	'using',
	'usually',
	'v',
	'value',
	'various',
	'very',
	'via',
	'viz',
	'vs',
	'w',
	'want',
	'wants',
	'was',
	'wasnt',
	'way',
	'we',
	'wed',
	'welcome',
	'well',
	'went',
	'were',
	'weve',
	'werent',
	'what',
	'whats',
	'whatever',
	'when',
	'whence',
	'whenever',
	'where',
	'whereafter',
	'whereas',
	'whereby',
	'wherein',
	'whereupon',
	'wherever',
	'wheres',
	'whether',
	'which',
	'while',
	'whither',
	'who',
	'whoever',
	'whole',
	'whom',
	'whos',
	'whose',
	'why',
	'will',
	'willing',
	'wish',
	'with',
	'within',
	'without',
	'wonder',
	'wont',
	'would',
	'would',
	'wouldnt',
	'x',
	'y',
	'yes',
	'yet',
	'you',
	'youd',
	'youll',
	'your',
	'youre',
	'yours',
	'yourself',
	'yourselves',
	'youve',
	'z',
	'zero'
);

($hook = vBulletinHook::fetch_hook('search_stopwords')) ? eval($hook) : false;

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 32878 $
|| ####################################################################
\*======================================================================*/
?>