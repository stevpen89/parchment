UPDATE cards
   SET card_name=$1,
	     card_birth=$2,
			 card_death=$3,
			 spouse_name=$4,
			 spouse_birth=$5,
			 spouse_death=$6
 WHERE card_id=$7;