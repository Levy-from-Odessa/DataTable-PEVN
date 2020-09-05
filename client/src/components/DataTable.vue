<template>
  <div>
    
    <v-card class="DataTable" v-if="!loading">
       <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <!-- data table -->
      <v-data-table 
        :headers="headers"
        :items="contacts"
        class="elevation-1 "
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            
              <template>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="addItem()"
                >New Item</v-btn>
              </template>
            
              
              
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
        
        
      </v-data-table>
    </v-card>

    <!-- my loading if it store in procces -->
    <div v-if="loading">
      <Loader/>
    </div>
    
    <!-- my error alert if recived an errror -->
    <v-alert v-if="error" type="error">
      {{errror}}
    </v-alert>

    <!-- My modal to create/update data  -->
    <div v-if="modal">
      <CreateItem :editedItem="editedItem"
                  :editModal="editModal"
                  @close-modal="modal=false"
      
        />
    </div>
    
    
  </div>
</template>



<script>
import CreateItem from './CreateItem'
import Loader from '../UI/Loader'
import { mapGetters,  mapActions } from 'vuex'
  export default {
    data: () => ({
      modal: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Surname', value: 'surname' },
        { text: 'Birthday', value: 'birthday' },
        { text: 'Phone number', value: 'phone' },
        { text: 'email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedItem: { },
      editModal:false,
      search:''
    }),
    

    // send req db to get all contacts
    mounted(){
      this.GET_CONTACTS()
    },
    // update contacts whenever it updates
    computed: {
      ...mapGetters([
        'contacts',
        'error',
        'loading'
      ])
    },
    
        

    methods: {
      ...mapActions([
        'GET_CONTACTS',
        'DEL_CONTACT'
      ]),
      // open modal with no data
      addItem(){
        this.editModal = false
        this.editedItem = {name:'', surname:'', birthday:'', phone:'', email:''}
        this.modal = true
      },
      // open modal with choised data
      editItem (item) {
        this.editModal = true
        this.editedItem = Object.assign({}, item)
        this.modal = true
      },
      // ask and delete item by id
      deleteItem (itemId) {
        confirm('Are you sure you want to delete this item?') && this.DEL_CONTACT({itemId})
      },

    },
    components:{
      CreateItem,
      Loader
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DataTable{
  width: 80%;
  margin: 50px auto;
}
input {
  border: 1px solid black;
  display: block;
  margin: 5px auto;
}
</style>
