import React from 'react'
import {withRouter} from 'react-router-dom'

function Countries(props) {
	return (
		<select className="product-select" onChange={(e)=>props.history.push(`/products/journal/missionary/${e.target.value.toLowerCase()}`)}>
			<option value="Albania">Albania</option>
			<option value="Angola">Angola</option>
			<option value="Argentina">Argentina</option>
			<option value="Armenia">Armenia</option>
			<option value="Australia">Australia</option>
			<option value="Barbados">Barbados</option>
			<option value="Belgium">Belgium</option>
			<option value="Benin">Benin</option>
			<option value="Bolivia">Bolivia</option>
			<option value="Botswana">Botswana</option>
			<option value="Brazil">Brazil</option>
			<option value="Bulgaria">Bulgaria</option>
			<option value="Cambodia">Cambodia</option>
			<option value="Canada">Canada</option>
			<option value="Cape Verde">Cape Verde</option>
			<option value="Chile">Chile</option>
			<option value="China">China</option>
			<option value="Colombia">Colombia</option>
			<option value="Costa Rica">Costa Rica</option>
			<option value="Cote d'ivoire Ivory Coast">Cote d'ivoire Ivory Coast</option>
			<option value="Croatia">Croatia</option>
			<option value="Czech">Czech</option>
			<option value="Dominican Republic">Dominican Republic</option>
			<option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
			<option value="Ecuador">Ecuador</option>
			<option value="El Salvador">El Salvador</option>
			<option value="England">England</option>
			<option value="Fiji">Fiji</option>
			<option value="Finland">Finland</option>
			<option value="France">France</option>
			<option value="Germany">Germany</option>
			<option value="Ghana">Ghana</option>
			<option value="Greece">Greece</option>
			<option value="Guatemala">Guatemala</option>
			<option value="Haiti">Haiti</option>
			<option value="Honduras">Honduras</option>
			<option value="Hungary">Hungary</option>
			<option value="India">India</option>
			<option value="Indonesia">Indonesia</option>
			<option value="Ireland">Ireland</option>
			<option value="Italy">Italy</option>
			<option value="Jamaica">Jamaica</option>
			<option value="Japan">Japan</option>
			<option value="Kenya">Kenya</option>
			<option value="Korea">Korea</option>
			<option value="Liberia">Liberia</option>
			<option value="Madagascar">Madagascar</option>
			<option value="Marshall Islands">Marshall Islands</option>
			<option value="Mexico">Mexico</option>
			<option value="Micronesia">Micronesia</option>
			<option value="Mongolia">Mongolia</option>
			<option value="Mozambique">Mozambique</option>
			<option value="Netherlands">Netherlands</option>
			<option value="New Zealand">New Zealand</option>
			<option value="Nicaragua">Nicaragua</option>
			<option value="Nigeria">Nigeria</option>
			<option value="Norway">Norway</option>
			<option value="Panama">Panama</option>
			<option value="Papua New Guinea">Papua New Guinea</option>
			<option value="Paraguay">Paraguay</option>
			<option value="Peru">Peru</option>
			<option value="Philippines">Philippines</option>
			<option value="Poland">Poland</option>
			<option value="Portugal">Portugal</option>
			<option value="Puerto Rico">Puerto Rico</option>
			<option value="Republic of Congo">Republic of Congo</option>
			<option value="Romania">Romania</option>
			<option value="Russia">Russia</option>
			<option value="Samoa">Samoa</option>
			<option value="Scotland">Scotland</option>
			<option value="Sierra Leone">Sierra Leone</option>
			<option value="Singapore">Singapore</option>
			<option value="Slovenia">Slovenia</option>
			<option value="South Africa">South Africa</option>
			<option value="Spain">Spain</option>
			<option value="Sweden">Sweden</option>
			<option value="Switzerland">Switzerland</option>
			<option value="Tahiti">Tahiti</option>
			<option value="Taiwan">Taiwan</option>
			<option value="Thailand">Thailand</option>
			<option value="Tonga">Tonga</option>
			<option value="Trinidad">Trinidad</option>
			<option value="Uganda">Uganda</option>
			<option value="Ukraine">Ukraine</option>
			<option value="Uruguay">Uruguay</option>
			<option value="Vanuatu">Vanuatu</option>
			<option value="Venezuela">Venezuela</option>
			<option value="Vietnam">Vietnam</option>
			<option value="Zambia">Zambia</option>
			<option value="Zimbabwe">Zimbabwe</option>
		</select>
	)
}

export default withRouter(Countries)