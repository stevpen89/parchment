UPDATE cards
   SET card_name=$2,
	     card_birth=$3,
			 card_death=$4,
			 spouse_added=$5,
			 spouse_name=$6,
			 spouse_birth=$7,
			 spouse_death=$8,
			 o1=$9
 WHERE card_id=$1;