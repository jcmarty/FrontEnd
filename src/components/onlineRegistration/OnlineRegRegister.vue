<template>
  <div class="Stud_main_container">
    <Header class="d-print-none"/>
    <div id="ToPrint">
      <div class="header d-none d-print-block">
        <!-- <img src="../../assets/images/comteq_logo.png" alt="Comteq Logo" class="logo"/> -->
        <img src="../../assets/images/header_logo.png" alt="Comteq Logo" class="logo"/>
      </div>
      <div class="content d-none d-print-block ">
        <div class=" h3 font-weight-bold text-dark text-center">(PRE-REGISTRATION FORM)</div>
        <p >Date: {{date}}</p>
        <hr/>
        <div class="">
          <b-form-row>
            <b-col>
              <b-form-group
                class="lastname"
                label="Last Name"
                label-for="lastName">
                <b-form-input
                  type="text"
                  v-model="StudentInformation.last_name"
                  id="lastName">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                class="firstname"
                label="First Name"
                label-for="firstName">
                <b-form-input
                  type="text"
                  v-model="StudentInformation.first_name"
                  id="firstName">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col >
              <b-form-group
                class="middlename"
                label="Middle Name"
                label-for="middleName">
                <b-form-input
                  type="text"
                  v-model="StudentInformation.middle_name">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col >
              <b-form-group
                class="suffixname"
                label="Suffix Name"
                label-for="suffixName">
                <b-form-input
                  type="text"
                  v-model="StudentInformation.suffix_name"
                  id="suffixName">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-form-group
                class="schoollastattended"
                label="School Last Attended"
                label-for="schoolLastAttended">
                <b-form-input
                  type="text"
                  v-model="StudentInformation.school_last_attended"
                  id="schoolLastAttended">
                </b-form-input>
              </b-form-group>
            </b-col>

              <b-col >
                <b-form-group
                  class="schooladdress"
                  label="School Address"
                  label-for="schoolAddress">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.school_address"
                    id="schoolAddress">
                  </b-form-input>
                </b-form-group>
              </b-col>

            </b-form-row>

            <b-form-row>

              <b-col >
                <b-form-group
                  class="universitycollege"
                  label="University / College (for transferee)"
                  label-for="universityCollege">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.college_last_attended"
                    id="universityCollege">
                  </b-form-input>
                </b-form-group>
              </b-col>
                <b-col>
                  <b-form-group
                    class="universicyaddress"
                    label="University Address"
                    label-for="universityAddress">
                    <b-form-input
                      type="text"
                      v-model="StudentInformation.college_address"
                      id="universityAddress">
                    </b-form-input>
                  </b-form-group>
                </b-col>

              </b-form-row>
            </div>

            <div class=" h5 font-weight-bold text-dark text-center">Personal Information</div>
            <hr/>
            <div class="">
              <b-form-row>
                <b-col cols="12" md="6" lg="5">
                  <b-form-group
                    class="presentaddress"
                    label="Present Address ( House No./Lot No./Bldg No./Street )"
                    label-for="presentAddress">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.address"
                      id="presentAddress">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    class="barangay"
                    label="Barangay / Subdivision"
                    label-for="Barangay">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.barangay"
                      id="Barangay">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    class="citymunicipality"
                    label="City / Municipality"
                    label-for="cityMunicipality">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.city"
                      id="cityMunicipality">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>

                <b-col >
                  <b-form-group
                    class="province"
                    label="Province"
                    label-for="Province">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.province"
                      id="Province">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col >
                  <b-form-group
                    class="postalcode"
                    label="Postal Code"
                    label-for="postalCode">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.postal"
                      id="postalCode">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col >
                  <b-form-group
                    class="birthdate"
                    label="Birth Date"
                    label-for="birthDate">
                    <datepicker
                      v-model="PersonalInformation.birth_date"
                      id="birthDate"
                      :calendar-button="true"
                      :calendar-button-icon="calendarIcon"
                      :bootstrap-styling="true"
                      :format="birthDateFormat">
                    </datepicker>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    class="gender"
                    label="Gender"
                    label-for="Gender">
                    <b-form-select
                      v-model="PersonalInformation.gender"
                      :options="genderOptions">
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <b-col cols="12" md="6" lg="4">
                  <b-form-group
                    class="emailaddress"
                    label="Email Address"
                    label-for="emailAddress">
                    <b-form-input
                      type="email"
                      v-model="PersonalInformation.email"
                      id="emailAddress">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6" lg="5">
                  <b-form-group
                    class="placeofbirth"
                    label="Place of Birth"
                    label-for="placeofBirth">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.birth_place"
                      id="placeofBirth">
                    </b-form-input>
                  </b-form-group>
                </b-col>

              </b-form-row>

              <b-form-row>

                <b-col>
                  <b-form-group
                    class="cellphoneno"
                    label="Cellphone No."
                    label-for="cellphoneNo">
                    <b-form-input
                      type="number"
                      v-model="PersonalInformation.cellphone"
                      id="cellphoneNo">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col >
                  <b-form-group
                    class="telephoneno"
                    label="Telephone No."
                    label-for="telephoneNo">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.telephone"
                      id="telephoneNo">
                    </b-form-input>
                  </b-form-group>
                </b-col>


                <b-col >
                  <b-form-group
                    class="citizenship"
                    label="Citizenship"
                    label-for="citizenShip">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.citizenship"
                      id="citizenShip">
                    </b-form-input>
                  </b-form-group>
                </b-col>

                <b-col >
                  <b-form-group
                    class="civilstatus"
                    label="Civil Status"
                    label-for="civilStatus">
                    <b-form-input
                      type="text"
                      v-model="PersonalInformation.civil_status"
                      id="civilStatus">
                    </b-form-input>
                  </b-form-group>
                </b-col>

            </b-form-row>
          </div>


        <div class=" h5 font-weight-bold text-dark text-center">Parents Information</div>
        <hr/>
        <div class="">
          <b-form-row>
            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="fathersname"
                label="Father's Name:"
                label-for="fathersName">
                <b-form-input
                  type="text"
                  v-model="ParentsInformation.father_name"
                  id="fathersName">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="6">
              <b-form-group
                class="mothersname"
                label="Mother's Name:"
                label-for="mothersName">
                <b-form-input
                  type="text"
                  v-model="ParentsInformation.mother_name"
                  id="mothersName">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <hr>
            <div class=" h5 font-weight-bold text-dark text-center">Guardian Information</div>
          <hr>

          <b-form-row>
            <b-col>
              <b-form-group
                class="guardianname"
                label="Guardian's Name:"
                label-for="guardianName">
                <b-form-input
                  type="text"
                  v-model="ParentsInformation.contact_person"
                  id="guardianName">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                class="contactaddress"
                label="Contact Address:"
                label-for="contactAddress">
                <b-form-input
                  type="text"
                  v-model="ParentsInformation.contact_address"
                  id="contactAddress">
                </b-form-input>
              </b-form-group>
            </b-col>

              <b-col >
                <b-form-group
                  class="contactnumber"
                  label="Contact Number"
                  label-for="contactNumber">
                  <b-form-input
                    type="number"
                    v-model="ParentsInformation.contact_number"
                    id="contactNumber">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <hr/>
            <span>This is system generated this is not valid without signature of authorized person.</span><br/><br/><br/><br/>
            <span class="Ssignature ">Student Signature</span> <span class="Rsignature float-right">Registrar Signature</span>
            <hr/>
          </div>
        </div>
    </div>

    <div class="Stud_body_container ">
      <ul class="Stud_progressbar d-print-none" v-if="progressBar">
          <li class="active">Student Information</li>
          <li id="PersonalInformation">Personal Information</li>
          <li id="ParentsInformation" >Parents Information</li>
          <li id="Preview" >Preview</li>
       </ul>


      <div class="Stud_container d-print-none">
        <transition name="fade">
          <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="GuidesForm">
            <b-alert variant="success"
                :show="dismissSuccessCountDown"
                @dismissed="dismissSuccessCountDown=0"
                dismissible fade>
                  {{alertMessage}}
              </b-alert>
              <b-alert variant="danger"
                :show="dismissErrorCountDown"
                @dismissed="dismissErrorCountDown=0"
                dismissible fade>
                  <p>{{alertMessage}}</p>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
              </b-alert>

            <strong>Proceed to Enrollment!</strong>
            <p>Read and Follow the process from the link below.</p>
            <b-link class="Stud_about" to="/AdmissionCollege">
              <center>Requirements/Process</center>
            </b-link>
          </div>
        </transition>
      </div>


      <!-- Student Information -->
      <div class="Stud_container">
        <transition name="fade">
          <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="StudentInfoshowForm">
          <div class="h5 font-weight-bold text-dark text-center">Student Information</div>
          <hr/>
          <div class="Stud_form_text">
            <b-form-row>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.StudentInformation.last_name.$error}"
                  label="Last Name *"
                  label-for="lastName">
                  <b-form-input
                    type="text"
                    id="lastName"
                    v-model.trim="$v.StudentInformation.last_name.$model"
                    :class="{'is-invalid' :$v.StudentInformation.last_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.StudentInformation.last_name.required">Last Name is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  :class="{'text-danger' : $v.StudentInformation.first_name.$error}"
                  label="First Name *"
                  label-for="firstName">
                  <b-form-input
                    type="text"
                    id="firstName"
                    v-model.trim="$v.StudentInformation.first_name.$model"
                    :class="{'is-invalid' :$v.StudentInformation.first_name.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.StudentInformation.first_name.required">First Name is required!</span>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="middlename"
                  label="Middle Name"
                  label-for="middleName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.middle_name"
                    id="middleName">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="suffixname"
                  label="Suffix Name"
                  label-for="suffixName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.suffix_name"
                    id="suffixName">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  :class="{'text-danger' : $v.StudentInformation.school_last_attended.$error}"
                  label="School Last Attended (High School) *"
                  label-for="schoolLastAttended">
                  <b-form-input
                    type="text"
                    id="schoolLastAttended"
                    v-model.trim="$v.StudentInformation.school_last_attended.$model"
                    :class="{'is-invalid' :$v.StudentInformation.school_last_attended.$error}">
                  </b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.StudentInformation.school_last_attended.required">School Last Attended is required!</span>
                  </div>
                </b-form-group>
              </b-col>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    :class="{'text-danger' : $v.StudentInformation.school_address.$error}"
                    label="School Address *"
                    label-for="schoolAddress">
                    <b-form-input
                      type="text"
                      id="schoolAddress"
                      v-model.trim="$v.StudentInformation.school_address.$model"
                      :class="{'is-invalid' :$v.StudentInformation.school_address.$error}">
                    </b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.StudentInformation.school_address.required">School Address is required!</span>
                    </div>
                  </b-form-group>
                </b-col>

              </b-form-row>

              <b-form-row>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    class="universitycollege"
                    label="University / College (for transferee)"
                    label-for="universityCollege">
                    <b-form-input
                      type="text"
                      v-model="StudentInformation.college_last_attended"
                      id="universityCollege">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                  <b-col cols="12" md="6" lg="6">
                    <b-form-group
                      class="universicyaddress"
                      label="University Address"
                      label-for="universityAddress">
                      <b-form-input
                        type="text"
                        v-model="StudentInformation.college_address"
                        id="universityAddress">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                </b-form-row>

                <hr/>

                <b-form-row>
                  <b-col>
                    <b-button variant="danger" @click="ClearStudentFields">
                      Cancel
                    </b-button>
                  </b-col>
                  <b-col class="d-flex justify-content-end">
                    <b-button variant="primary" @click="showPersonalInfoForm">
                      Next
                    </b-button>
                  </b-col>
                </b-form-row>
              </div>
          </div>
        </transition>
      </div>
      <!-- Student Information -->

      <!-- personal Information -->
      <div id="Stud_container">
        <transition name="fade">
        <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded"  v-if="PersonalInfoshowForm">
        <div class=" h5 font-weight-bold text-dark text-center">Personal Information</div>
        <hr/>
        <div class="">
          <b-form-row>
            <b-col cols="12" md="6" lg="5">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.address.$error}"
                label="Present Address ( House No./Lot No./Bldg No./Street ) *"
                label-for="presentAddress">
                <b-form-input
                  type="text"
                  id="presentAddress"
                  v-model.trim="$v.PersonalInformation.address.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.address.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.address.required">Present Address is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.barangay.$error}"
                label="Barangay / Subdivision *"
                label-for="Barangay">
                <b-form-input
                  type="text"
                  id="Barangay"
                  v-model.trim="$v.PersonalInformation.barangay.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.barangay.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.barangay.required">Barangay / Subdivision is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.city.$error}"
                label="City / Municipality *"
                label-for="cityMunicipality">
                <b-form-input
                  type="text"
                  id="cityMunicipality"
                  v-model.trim="$v.PersonalInformation.city.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.city.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.city.required">City / Municipality is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.province.$error}"
                label="Province *"
                label-for="Province">
                <b-form-input
                  type="text"
                  id="Province"
                  v-model.trim="$v.PersonalInformation.province.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.province.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.province.required">Province is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="1">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.postal.$error}"
                label="Postal Code *"
                label-for="postalCode">
                <b-form-input
                  type="text"
                  id="postalCode"
                  v-model.trim="$v.PersonalInformation.postal.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.postal.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.postal.required">Postal Code is required!</span>
                </div>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col cols="12" md="6" lg="3">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.birth_date.$error}"
                label="Birth Date *"
                label-for="birthDate">
                <datepicker
                  id="birthDate"
                  :clear-button="true"
                  :calendar-button="true"
                  :calendar-button-icon="calendarIcon"
                  :bootstrap-styling="true"
                  :format="birthDateFormat"
                  v-model.trim="$v.PersonalInformation.birth_date.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.birth_date.$error}">
                </datepicker>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.birth_date.required">Birth Date is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.gender.$error}"
                label="Gender *"
                label-for="Gender">
                <b-form-select
                  :options="genderOptions"
                  v-model.trim="$v.PersonalInformation.gender.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.gender.$error}">
                </b-form-select>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.gender.required">Gender is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="4">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.email.$error}"
                label="Email Address *"
                label-for="emailAddress">
                <b-form-input
                  type="email"
                  id="emailAddress"
                  v-model.trim="$v.PersonalInformation.email.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.email.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.email.required">Email Addressis required!</span>
                  <span v-if="!$v.PersonalInformation.email.email">You have entered an invalid email address!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.cellphone.$error}"
                label="Cellphone No."
                label-for="cellphoneNo">
                <b-form-input
                  type="number"
                  onKeyPress="if(this.value.length==11) return false;"
                  id="cellphoneNo"
                  v-model.trim="$v.PersonalInformation.cellphone.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.cellphone.$error}"
                  >
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.cellphone.required">Contact No is required!</span>
                  <span v-if="!$v.PersonalInformation.cellphone.maxLength">Maximum of 11 digits!</span>
                  <span v-if="!$v.PersonalInformation.cellphone.minLength">Minimum of 11 digits!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="5">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.birth_place.$error}"
                label="Place of Birth *"
                label-for="placeofBirth">
                <b-form-input
                  type="text"
                  id="placeofBirth"
                  v-model.trim="$v.PersonalInformation.birth_place.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.birth_place.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.birth_place.required">Place of Birth is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.citizenship.$error}"
                label="Citizenship *"
                label-for="citizenShip">
                <b-form-input
                  type="text"
                  id="citizenShip"
                  v-model.trim="$v.PersonalInformation.citizenship.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.citizenship.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.citizenship.required">Citizenship is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="2">
              <b-form-group
                :class="{'text-danger' : $v.PersonalInformation.civil_status.$error}"
                label="Civil Status *"
                label-for="civilStatus">
                <b-form-input
                  type="text"
                  id="civilStatus"
                  v-model.trim="$v.PersonalInformation.civil_status.$model"
                  :class="{'is-invalid' :$v.PersonalInformation.civil_status.$error}">
                </b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.PersonalInformation.civil_status.required">Civil Status is required!</span>
                </div>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3">
              <b-form-group
                class="telephoneno"
                label="Telephone No."
                label-for="telephoneNo">
                <b-form-input
                  type="text"
                  v-model="PersonalInformation.telephone"
                  id="telephoneNo"
                  required>
                </b-form-input>
              </b-form-group>
            </b-col>

            </b-form-row>
            <hr/>
            <b-form-row>
              <b-col>
                <b-button variant="danger" @click="backStudentInfoForm">
                  Previous
                </b-button>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button variant="primary" @click="showParentsInfoForm">
                  Next
                </b-button>
              </b-col>
              </b-form-row>
        </div>
      </div>
      </transition>

          </div>
            <!--/personal Information -->


            <!-- Parents Information -->
          <div id="Stud_container">
            <transition name="fade">
              <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded" v-if="ParentsInfoshowForm">
              <div class=" h5 font-weight-bold text-dark text-center">Parents Information</div>
              <hr/>
              <div class="">
                <b-form-row>
                  <b-col cols="12" md="6" lg="6">
                    <b-form-group
                      class="fathersname"
                      label="Father's Name:"
                      label-for="fathersName">
                      <b-form-input
                        type="text"
                        v-model="ParentsInformation.father_name"
                        id="fathersName">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="6">
                    <b-form-group
                      :class="{'text-danger' : $v.ParentsInformation.mother_name.$error}"
                      label="Mother's Name *"
                      label-for="mothersName">
                      <b-form-input
                        type="text"
                        id="mothersName"
                        v-model.trim="$v.ParentsInformation.mother_name.$model"
                        :class="{'is-invalid' :$v.ParentsInformation.mother_name.$error}">
                      </b-form-input>
                      <div class="invalid-feedback">
                        <span v-if="!$v.ParentsInformation.mother_name.required">Mother's Name is required!</span>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <hr>
                  <div class=" h5 font-weight-bold text-dark text-center">Guardian Information</div>
                <hr>

                <b-form-row>
                  <b-col cols="12" md="6" lg="4">
                    <b-form-group
                      :class="{'text-danger' : $v.ParentsInformation.contact_person.$error}"
                      label="Guardian's Name *"
                      label-for="guardianName">
                      <b-form-input
                        type="text"
                        id="guardianName"
                        v-model.trim="$v.ParentsInformation.contact_person.$model"
                        :class="{'is-invalid' :$v.ParentsInformation.contact_person.$error}">
                      </b-form-input>
                      <div class="invalid-feedback">
                        <span v-if="!$v.ParentsInformation.contact_person.required">Guardian's Name is required!</span>
                      </div>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="4">
                    <b-form-group
                      :class="{'text-danger' : $v.ParentsInformation.contact_address.$error}"
                      label="Contact Address *"
                      label-for="contactAddress">
                      <b-form-input
                        type="text"
                        id="contactAddress"
                        v-model.trim="$v.ParentsInformation.contact_address.$model"
                        :class="{'is-invalid' :$v.ParentsInformation.contact_address.$error}">
                      </b-form-input>
                      <div class="invalid-feedback">
                        <span v-if="!$v.ParentsInformation.contact_address.required">Contact Address is required!</span>
                      </div>
                    </b-form-group>
                  </b-col>

                <b-col cols="12" md="6" lg="4">
                  <b-form-group
                    :class="{'text-danger' : $v.ParentsInformation.contact_number.$error}"
                    label="Contact Number *"
                    label-for="contactNumber">
                    <b-form-input
                      type="number"
                      id="contactNumber"
                      onKeyPress="if(this.value.length==11) return false;"
                      v-model.trim="$v.ParentsInformation.contact_number.$model"
                      :class="{'is-invalid' :$v.ParentsInformation.contact_number.$error}">
                    </b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.ParentsInformation.contact_number.required">Contact Number is required!</span>
                      <span v-if="!$v.ParentsInformation.contact_number.maxLength">Maximum of 11 digits!</span>
                      <span v-if="!$v.ParentsInformation.contact_number.minLength">Minimum of 11 digits!</span>
                    </div>
                  </b-form-group>
                </b-col>
            </b-form-row>
            <hr/>
                  <b-form-row>
                    <b-col>
                      <b-button variant="danger" @click="backPersonalInfoForm">
                        Previous
                      </b-button>
                    </b-col>
                    <b-col class="d-flex justify-content-end">
                      <b-button variant="primary" @click="ShowAllInfoForm">
                        Next
                      </b-button>
                    </b-col>
                    </b-form-row>
              </div>
            </div>
          </transition>
        </div>
        <!-- Parents Information -->
      <div id="Stud_container" class="d-print-none">
        <transition name="fade">
          <div id="" class="mx-3 mb-4 p-4 bg-white shadow rounded"  v-if="ShowAllInfoshowForm">
            <hr/>
            <div class=" h6 text-dark "><b>NOTE: </b>
             <br/><br/>Please review your application details below to ensure that all the information provided is correct. You can click on the <b>"Previous"</b>
             button below to edit the details you provided. If all the details are correct download and print this file before clicking the <b>"Register"</b> button below.
           </div>
          <hr/>
            <b-form-row>
            <b-col>
            <b-button variant="dark" onclick="window.print()" class="d-print-none float-right"
            v-b-tooltip.hover title="Print / To download PDF file please change destination option to SAVE AS PDF after clicking this button">
              Print / Download PDF
            </b-button>
          </b-col>
          </b-form-row>

          <div class=" h5 font-weight-bold text-dark text-center">Student Information</div>
          <hr/>
          <div class="">

            <b-form-row>
              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="lastname"
                  label="Last Name"
                  label-for="lastName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.last_name"
                    id="lastName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="firstname"
                  label="First Name"
                  label-for="firstName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.first_name"
                    id="firstName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="middlename"
                  label="Middle Name"
                  label-for="middleName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.middle_name"
                    id="middleName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="3">
                <b-form-group
                  class="suffixname"
                  label="Suffix Name"
                  label-for="suffixName">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.suffix_name"
                    id="suffixName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-row>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="schoollastattended"
                  label="School Last Attended"
                  label-for="schoolLastAttended">
                  <b-form-input
                    type="text"
                    v-model="StudentInformation.school_last_attended"
                    id="schoolLastAttended"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    class="schooladdress"
                    label="School Address"
                    label-for="schoolAddress">
                    <b-form-input
                      type="text"
                      v-model="StudentInformation.school_address"
                      id="schoolAddress"
                      :disabled="information_disable">
                    </b-form-input>
                  </b-form-group>
                </b-col>

              </b-form-row>

              <b-form-row>

                <b-col cols="12" md="6" lg="6">
                  <b-form-group
                    class="universitycollege"
                    label="University / College (for transferee)"
                    label-for="universityCollege">
                    <b-form-input
                      type="text"
                      v-model="StudentInformation.college_last_attended"
                      id="universityCollege"
                      :disabled="information_disable">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                  <b-col cols="12" md="6" lg="6">
                    <b-form-group
                      class="universicyaddress"
                      label="University Address"
                      label-for="universityAddress">
                      <b-form-input
                        type="text"
                        v-model="StudentInformation.college_address"
                        id="universityAddress"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                </b-form-row>
              </div>

              <div class=" h5 font-weight-bold text-dark text-center">Personal Information</div>
              <hr/>
              <div class="">
                <b-form-row>
                  <b-col cols="12" md="6" lg="5">
                    <b-form-group
                      class="presentaddress"
                      label="Present Address ( House No./Lot No./Bldg No./Street )"
                      label-for="presentAddress">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.address"
                        id="presentAddress"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="barangay"
                      label="Barangay / Subdivision"
                      label-for="Barangay">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.barangay"
                        id="Barangay"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="citymunicipality"
                      label="City / Municipality"
                      label-for="cityMunicipality">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.city"
                        id="cityMunicipality"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="province"
                      label="Province"
                      label-for="Province">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.province"
                        id="Province"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="1">
                    <b-form-group
                      class="postalcode"
                      label="Postal Code"
                      label-for="postalCode">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.postal"
                        id="postalCode"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col cols="12" md="6" lg="3">
                    <b-form-group
                      class="birthdate"
                      label="Birth Date"
                      label-for="birthDate">
                      <datepicker
                        v-model="PersonalInformation.birth_date"
                        id="birthDate"
                        :calendar-button="true"
                        :calendar-button-icon="calendarIcon"
                        :bootstrap-styling="true"
                        :format="birthDateFormat"
                        :disabled="information_disable">
                      </datepicker>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="gender"
                      label="Gender"
                      label-for="Gender">
                      <b-form-select
                        v-model="PersonalInformation.gender"
                        :options="genderOptions"
                        :disabled="information_disable">
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="4">
                    <b-form-group
                      class="emailaddress"
                      label="Email Address"
                      label-for="emailAddress">
                      <b-form-input
                        type="email"
                        v-model="PersonalInformation.email"
                        id="emailAddress"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="3">
                    <b-form-group
                      class="cellphoneno"
                      label="Cellphone No."
                      label-for="cellphoneNo">
                      <b-form-input
                        type="number"
                        v-model="PersonalInformation.cellphone"
                        id="cellphoneNo"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="5">
                    <b-form-group
                      class="placeofbirth"
                      label="Place of Birth"
                      label-for="placeofBirth">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.birth_place"
                        id="placeofBirth"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="citizenship"
                      label="Citizenship"
                      label-for="citizenShip">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.citizenship"
                        id="citizenShip"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="2">
                    <b-form-group
                      class="civilstatus"
                      label="Civil Status"
                      label-for="civilStatus">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.civil_status"
                        id="civilStatus"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" lg="3">
                    <b-form-group
                      class="telephoneno"
                      label="Telephone No."
                      label-for="telephoneNo">
                      <b-form-input
                        type="text"
                        v-model="PersonalInformation.telephone"
                        id="telephoneNo"
                        :disabled="information_disable">
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </div>


          <div class=" h5 font-weight-bold text-dark text-center">Parents Information</div>
          <hr/>
          <div class="">
            <b-form-row>
              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="fathersname"
                  label="Father's Name:"
                  label-for="fathersName">
                  <b-form-input
                    type="text"
                    v-model="ParentsInformation.father_name"
                    id="fathersName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="6">
                <b-form-group
                  class="mothersname"
                  label="Mother's Name:"
                  label-for="mothersName">
                  <b-form-input
                    type="text"
                    v-model="ParentsInformation.mother_name"
                    id="mothersName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>

            <hr>
              <div class=" h5 font-weight-bold text-dark text-center">Guardian Information</div>
            <hr>

            <b-form-row>
              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="guardianname"
                  label="Guardian's Name:"
                  label-for="guardianName">
                  <b-form-input
                    type="text"
                    v-model="ParentsInformation.contact_person"
                    id="guardianName"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6" lg="4">
                <b-form-group
                  class="contactaddress"
                  label="Contact Address:"
                  label-for="contactAddress">
                  <b-form-input
                    type="text"
                    v-model="ParentsInformation.contact_address"
                    id="contactAddress"
                    :disabled="information_disable">
                  </b-form-input>
                </b-form-group>
              </b-col>

                <b-col cols="12" md="6" lg="4">
                  <b-form-group
                    class="contactnumber"
                    label="Contact Number"
                    label-for="contactNumber">
                    <b-form-input
                      type="number"
                      v-model="ParentsInformation.contact_number"
                      id="contactNumber"
                      :disabled="information_disable">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>

            <hr/>

              <b-form-row>
                <b-col>
                  <b-button variant="danger" @click="backParentInfoForm" class="d-print-none">
                    Previous
                  </b-button>
                </b-col>
                <b-col class="d-flex justify-content-end">
                  <b-button variant="primary" @click="RegStudents" class="d-print-none">
                    Register
                  </b-button>
                </b-col>
                </b-form-row>
              </div>
            </div>
        </transition>
      </div>
    </div>

      <Footer class="d-print-none" />
    </div>
</template>


<script>
import Axios from "axios";
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators';
import Header from "./OnlineRegHeader.vue";
import Footer from "./OnlineRegFooter.vue";

  export default {
    name: 'OnlineRegRegister',
    components:{
      Header,
      Footer,
      Datepicker,
      VueTimepicker,
    },

data() {
  return {
    StudentInformation: {
      id: null,
      student_number: null,
      first_name: null,
      middle_name: null,
      last_name: null,
      suffix_name: null,
      school_last_attended: null,
      school_address: null,
      college_last_attended: null,
      college_address: null,
      gender: null,
      civil_status: null,
      citizenship:null,
      address: null,
      barangay: null,
      city: null,
      postal: null,
      province: null,
      telephone: null,
      cellphone: null,
      email: null,
      birth_date: null,
      birth_place: null,
      father_name: null,
      mother_name: null,
      contact_person: null,
      contact_address: null,
      contact_number: null,
      blood_type: null,
      photo_url: null,
      user_id: null,
      active: 1,
    },

    PersonalInformation: {
      gender: null,
      civil_status: null,
      citizenship:null,
      address: null,
      barangay: null,
      city: null,
      postal: null,
      province: null,
      telephone: null,
      cellphone: null,
      email: null,
      birth_date: null,
      birth_place: null,
      blood_type: null,
      photo_url: null,
      user_id: null,
      active: 1,
    },

    ParentsInformation: {
      father_name: null,
      mother_name: null,
      contact_person: null,
      contact_address: null,
      contact_number: null,
    },

    alertMessage: "",
    errors: [],
    dismissSecs: 7,
    dismissSuccessCountDown: 0,
    dismissErrorCountDown: 0,
    updateSuccessCountDown: 0,
    updateErrorCountDown: 0,

    genderOptions: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'}
      ],

      StudentStatusOptions: [
        {value: 'Old', text: 'Old'},
        {value: 'New', text: 'New'},
        {value: 'Transferee', text: 'Transferee'}
      ],

      AcademicStatusOptions: [
        {value: 'Regular', text: 'Regular'},
        {value: 'Irregular', text: 'Irregular'}
      ],

      calendarIcon: "fa fa-calendar",
      birthDateFormat: "MMM dd, yyyy",

      progressBar: true,
      GuidesForm: false,
      StudentInfoshowForm: true,
      PersonalInfoshowForm: false,
      ParentsInfoshowForm: false,
      ShowAllInfoshowForm: false,
      information_disable: true,

      date: null,


  }
},

validations: {
 StudentInformation: {
   first_name: {required},
   last_name: {required},
   school_last_attended: {required},
   school_address: {required},
 },

 PersonalInformation: {
   gender: {required},
   civil_status: {required},
   citizenship:{required},
   address: {required},
   barangay: {required},
   city: {required},
   postal: {required},
   province: {required},
   cellphone: {required, minLength: minLength(11), maxLength: maxLength(11)},
   email: {required, email},
   birth_date: {required},
   birth_place: {required},
 },

 ParentsInformation: {
   mother_name: {required},
   contact_person: {required},
   contact_address: {required},
   contact_number: {required, minLength: minLength(11), maxLength: maxLength(11)},
 },
},

mounted(){
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
var Currdate = m + "/" + d + "/" + y;
this.date = Currdate;
},
methods: {


  backPersonalInfoForm: function(){
    this.PersonalInfoshowForm = true;
    this.ParentsInfoshowForm = false;
  },

  backStudentInfoForm: function(){
    this.StudentInfoshowForm = true;
    this.PersonalInfoshowForm = false;
  },

  backParentInfoForm: function(){
    this.ShowAllInfoshowForm = false;
    this.ParentsInfoshowForm = true;
  },

  showPersonalInfoForm: function(){
    this.$v.StudentInformation.$touch();
    if (this.$v.StudentInformation.$anyError) {
      return;
    }else {
      this.StudentInfoshowForm = false;
      this.PersonalInfoshowForm = true;
      var element = document.getElementById("PersonalInformation");
      element.classList.add("active");
    }

  },

  showParentsInfoForm: function(){
    this.$v.PersonalInformation.$touch();
    if (this.$v.PersonalInformation.$anyError) {
      return;
    }else {
      this.ParentsInfoshowForm = true;
      this.PersonalInfoshowForm = false;
      var element = document.getElementById("ParentsInformation");
      element.classList.add("active");
    }
  },

  ShowAllInfoForm: function(){
    this.$v.ParentsInformation.$touch();
    if (this.$v.ParentsInformation.$anyError) {
      return;
    }else {
      this.ShowAllInfoshowForm = true;
      this.ParentsInfoshowForm = false;
      var element = document.getElementById("Preview");
      element.classList.add("active");
    }
},


  RegStudents: function(){
    this.StudentInformation.address = this.PersonalInformation.address;
    this.StudentInformation.barangay = this.PersonalInformation.barangay;
    this.StudentInformation.city = this.PersonalInformation.city;
    this.StudentInformation.province = this.PersonalInformation.province;
    this.StudentInformation.postal = this.PersonalInformation.postal;
    this.StudentInformation.birth_date = this.PersonalInformation.birth_date;
    this.StudentInformation.gender = this.PersonalInformation.gender;
    this.StudentInformation.email = this.PersonalInformation.email;
    this.StudentInformation.cellphone = this.PersonalInformation.cellphone;
    this.StudentInformation.birth_place = this.PersonalInformation.birth_place;
    this.StudentInformation.citizenship = this.PersonalInformation.citizenship;
    this.StudentInformation.civil_status = this.PersonalInformation.civil_status;
    this.StudentInformation.mother_name = this.ParentsInformation.mother_name;
    this.StudentInformation.contact_person = this.ParentsInformation.contact_person;
    this.StudentInformation.contact_address = this.ParentsInformation.contact_address;
    this.StudentInformation.contact_number = this.ParentsInformation.contact_number;

    Axios
    .post('http://localhost/api/v1/pre_registers', this.StudentInformation, {
      headers: {'Authorization': 'Bearer ' + this.$store.getters.getToken}
      })
      .then(response => {
        console.log(response.data);
        this.alertMessage = "New student record successfully created.";
        this.ShowAllInfoshowForm = false;
        this.ClearStudentFields();
        this.progressBar = false;
        this.GuidesForm = true;
        this.dismissSuccessCountDown = this.dismissSecs;
      })
      .catch(error => {
        this.alertMessage = error.response.data.message;
        const values = Object.values(error.response.data.errors);
        for(const val of values){
        for(const err of val){
        this.errors.push(err);
        }
      }
      this.dismissErrorCountDown = this.dismissSecs;
      })
  },

      ClearStudentFields: function(){
        this.Students = {
          student_number: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          suffix_name: null,
          gender: null,
          civil_status: null,
          citizenship:null,
          address: null,
          barangay: null,
          city: null,
          postal: null,
          province: null,
          telephone: null,
          cellphone: null,
          email: null,
          birth_date: null,
          birth_place: null,
          father_name: null,
          mother_name: null,
          contact_person: null,
          contact_address: null,
          contact_number: null,
          blood_type: null,
          photo_url: null,
          user_id: null,
          school_last_attended: null,
          school_address: null,
          college_last_attended: null,
          college_address: null,
          active: 1,
        };
},



    }
  }
</script>
<style>
  @media print {
  .tooltip { visibility: hidden; }

    #ToPrint {
      margin-top : 20px;
      font-size: 14pt;
    }

    input{
      height: 500px;
    }
  }
</style>
