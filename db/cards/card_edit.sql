UPDATE cards
   SET card_name=$2,
	     card_birth=$3,
			 card_death=$4,
			 spouse_name=$5,
			 spouse_birth=$6,
			 spouse_death=$7,
			 o1=$8
 WHERE card_id=$1;