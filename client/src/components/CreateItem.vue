<template>
    <div>
        <div class="background">

        </div>
        <v-card class="modal">

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" :rules="rules.common"  label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.surname" :rules="rules.common" label="Surname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker :date="editedItem.birthday" @set-date="SetDate"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" :rules="rules.phone" label="Phone Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" :rules="rules.email" label="email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="$emit('close-modal')">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">{{editModal ? 'Edit' : 'Save' }}</v-btn>
            </v-card-actions>
          </v-card>
    </div>
  
  
</template>

<script>
import DatePicker from './DatePicker'
import { mapActions } from 'vuex'
export default {
  props: ['editedItem', 'editModal'],
  data: () => ({
      
      rules: {
        // usuall rules
        common: [value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => (value && value.length >= 3) || 'Min 3 characters',],
        // email rules
        email:[value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'}
          ],
        // phone rules
        phone:[value => {
          const pattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/
          return pattern.test(value) || 'Invalid phone'}
          ]
      }

      
    }),
  methods: {
    ...mapActions(['UPDATE_CONTACT', 'ADD_CONTACT']),
    // if it edit modal -> update 
    // else -> create new item 
    // and close modal
    save() {
      if(this.editModal){
        this.UPDATE_CONTACT(this.editedItem)
      }else{
        this.ADD_CONTACT(this.editedItem)
      }
      this.$emit('close-modal')
      
    },
    // get birthday from datePicker
    SetDate(date){
      this.editedItem.birthday = date
    }
    
  },
  components:{
    DatePicker
  }
}
</script>

<style style='scss'>
.CreateItem{
  position: fixed;
  top: 0;
}
.background{
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 10, .5);
}
.modal{
 position: absolute;
 bottom: 450px;
 left: 25%;
 width: 50%;
 z-index: 100;

}
</style>