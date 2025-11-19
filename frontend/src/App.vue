<template>
  <v-app class="bg-grey-lighten-5">
    <!-- Minimalist Navbar -->
    <v-app-bar color="white" elevation="0" class="border-b">
      <v-app-bar-title class="font-weight-bold text-grey-darken-3">Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <!-- Only show refresh button in navbar if we actually have data -->
      <v-btn 
        v-if="users.length > 0"
        icon="mdi-refresh"
        variant="text" 
        color="grey-darken-2"
        @click="loadUsers"
        :loading="loadingTable"
        title="Refresh List"
      ></v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        
        <!-- STATE 1: FETCHING DATA (Progress Bar) -->
        <v-row v-if="loadingFetch" class="d-flex justify-center align-center fill-height">
          <v-col cols="12" md="6" class="text-center">
            <h2 class="text-h5 font-weight-medium text-grey-darken-3 mb-4">Setting up your workspace...</h2>
            <p class="text-body-2 text-grey-darken-1 mb-6">
              Fetching 1000 users from the API and populating the database. <br>
              This ensures we have fresh data to work with.
            </p>
            <div class="px-12">
              <v-progress-linear
                color="black"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </div>
          </v-col>
        </v-row>

        <!-- STATE 2: EMPTY STATE (First Launch Button) -->
        <v-row v-else-if="users.length === 0 && !loadingTable" class="d-flex justify-center align-center fill-height">
          <v-col cols="12" md="6" class="text-center">
            <v-icon icon="mdi-database-outline" size="64" color="grey-lighten-1" class="mb-6"></v-icon>
            <h1 class="text-h4 font-weight-bold text-grey-darken-3 mb-3">No Users Found</h1>
            <p class="text-body-1 text-grey-darken-1 mb-8">
              The database is currently empty. <br>
              Fetch 1000 users to initialize the dashboard.
            </p>
            
            <v-btn 
              size="x-large" 
              color="black" 
              class="text-white px-10 text-none" 
              elevation="2"
              @click="triggerFetch"
              rounded="lg"
            >
              Fetch Users
            </v-btn>
          </v-col>
        </v-row>

        <!-- STATE 3: DATA TABLE (Main View) -->
        <div v-else class="w-100 h-100 d-flex flex-column">
           <!-- Header Section -->
           <div class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-6 mt-4">
              <div>
                <h1 class="text-h5 font-weight-bold text-grey-darken-4">User Management</h1>
                <p class="text-caption text-grey-darken-1 mt-1">{{ users.length }} active records</p>
              </div>
              <div class="mt-4 mt-md-0" style="min-width: 320px;">
                <v-text-field
                  v-model="search"
                  placeholder="Search by name, email, or city..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  color="primary"
                  class="rounded-lg"
                ></v-text-field>
              </div>
           </div>

           <!-- Minimalist Table -->
           <v-card elevation="0" border class="rounded-lg overflow-hidden flex-grow-1">
              <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                :loading="loadingTable"
                :items-per-page="25" 
                hover
                class="text-body-2"
              >
                <!-- Name Column (Clean Text, No Avatar) -->
                <template v-slot:item.name="{ item }">
                  <span class="font-weight-bold text-grey-darken-3">{{ item.name }}</span>
                </template>

                <!-- Email Column -->
                <template v-slot:item.email="{ item }">
                  <span class="text-grey-darken-1">{{ item.email }}</span>
                </template>

                <!-- City Column -->
                <template v-slot:item.city="{ item }">
                  <span class="text-grey-darken-2">{{ item.city }}</span>
                </template>

                <!-- Actions Column -->
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    icon="mdi-pencil-outline"
                    size="small"
                    variant="text"
                    color="grey-darken-3"
                    class="opacity-75 hover:opacity-100"
                    @click="openEditDialog(item)"
                    title="Edit User"
                  ></v-btn>
                </template>
              </v-data-table>
           </v-card>
        </div>

        <!-- Modern Edit Dialog -->
        <v-dialog v-model="dialog" max-width="450px">
          <v-card class="rounded-xl pa-4" elevation="4">
            <v-card-title class="d-flex justify-space-between align-center px-2 pt-2 pb-4">
              <span class="text-h6 font-weight-bold">Edit User</span>
              <v-btn icon="mdi-close" variant="text" size="small" color="grey" @click="closeDialog"></v-btn>
            </v-card-title>
            
            <v-card-text class="px-2">
                <v-label class="text-caption font-weight-bold text-grey-darken-1 mb-1 ml-1">FULL NAME</v-label>
                <v-text-field 
                  v-model="editedItem.name" 
                  variant="outlined" 
                  density="compact" 
                  color="black"
                  class="mb-4"
                  hide-details="auto"
                ></v-text-field>

                <v-label class="text-caption font-weight-bold text-grey-darken-1 mb-1 ml-1">EMAIL ADDRESS</v-label>
                <v-text-field 
                  v-model="editedItem.email" 
                  variant="outlined" 
                  density="compact" 
                  color="black"
                  class="mb-4"
                  hide-details="auto"
                ></v-text-field>

                <v-label class="text-caption font-weight-bold text-grey-darken-1 mb-1 ml-1">CITY</v-label>
                <v-text-field 
                  v-model="editedItem.city" 
                  variant="outlined" 
                  density="compact" 
                  color="black"
                  hide-details="auto"
                ></v-text-field>
            </v-card-text>

            <v-card-actions class="px-2 pb-2 pt-6">
              <v-btn 
                block
                color="black" 
                variant="flat" 
                size="large"
                class="rounded-lg text-none font-weight-bold"
                @click="saveUser"
              >
                Save Changes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Use the service we created
import userService from './services/userService'; 

// State Variables
const users = ref([]);
const search = ref('');
const loadingTable = ref(false);
const loadingFetch = ref(false);
const dialog = ref(false);
const editedItem = ref({});

const headers = [
  { title: 'Name', key: 'name', align: 'start', width: '30%' },
  { title: 'Email', key: 'email', align: 'start', width: '35%' },
  { title: 'City', key: 'city', align: 'start', width: '25%' },
  { title: 'Action', key: 'actions', sortable: false, align: 'end', width: '10%' },
];

// --- 1. Load Users ---
const loadUsers = async () => {
  loadingTable.value = true;
  try {
    users.value = await userService.getAllUsers();
  } catch (e) {
    console.error("Error loading users:", e);
  } finally {
    loadingTable.value = false;
  }
};

// --- 2. Fetch Data ---
const triggerFetch = async () => {
  loadingFetch.value = true;
  try {
    await userService.fetchAndPopulateDB();
    // Refresh the list after fetching
    await loadUsers(); 
  } catch (e) {
    alert("Error fetching data from API.");
    console.error(e);
  } finally {
    loadingFetch.value = false;
  }
};

const openEditDialog = (item) => {
  editedItem.value = { ...item };
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

// --- 3. Save User ---
const saveUser = async () => {
  try {
    const { uuid, name, email, city } = editedItem.value;
    
    await userService.updateUser(uuid, { name, email, city });
    
    const index = users.value.findIndex(u => u.uuid === uuid);
    if (index !== -1) {
      Object.assign(users.value[index], editedItem.value);
    }
    
    dialog.value = false;
  } catch (e) {
    alert("Failed to save.");
    console.error(e);
  }
};

onMounted(loadUsers);
</script>