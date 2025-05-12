<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-primary-800">Nuxt.js MySQL Database Demo</h1>
    
    <div class="flex gap-4 mb-8">
      <button @click="activeTab = 'users'" 
              :class="['btn', activeTab === 'users' ? 'btn-primary' : 'btn-secondary']">
        Users
      </button>
      <button @click="activeTab = 'products'" 
              :class="['btn', activeTab === 'products' ? 'btn-primary' : 'btn-secondary']">
        Products
      </button>
    </div>
    
    <!-- Users Tab -->
    <div v-if="activeTab === 'users'" class="space-y-6">
      <div class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">Add New User</h2>
        <form @submit.prevent="createUser" class="space-y-3">
          <div>
            <label for="name" class="block mb-1 font-medium">Name</label>
            <input type="text" id="name" v-model="userForm.name" required 
                   class="form-input" />
          </div>
          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input type="email" id="email" v-model="userForm.email" required 
                   class="form-input" />
          </div>
          <div>
            <label for="password" class="block mb-1 font-medium">Password</label>
            <input type="password" id="password" v-model="userForm.password" required 
                   class="form-input" />
          </div>
          <button type="submit" class="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
      
      <div class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">Users List</h2>
        <div v-if="loadingUsers" class="text-center py-4 text-gray-600">Loading users...</div>
        <div v-else-if="users.length === 0" class="text-center py-4 text-gray-600">No users found</div>
        <table v-else class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left font-medium">ID</th>
              <th class="p-2 text-left font-medium">Name</th>
              <th class="p-2 text-left font-medium">Email</th>
              <th class="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-t hover:bg-gray-50">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                <button @click="getUserDetails(user.id)" class="text-primary-600 hover:text-primary-800 underline">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="selectedUser" class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">User Details</h2>
        <div class="space-y-2">
          <p><strong class="text-gray-700">ID:</strong> {{ selectedUser.id }}</p>
          <p><strong class="text-gray-700">Name:</strong> {{ selectedUser.name }}</p>
          <p><strong class="text-gray-700">Email:</strong> {{ selectedUser.email }}</p>
          <p><strong class="text-gray-700">Created At:</strong> {{ new Date(selectedUser.createdAt).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    
    <!-- Products Tab -->
    <div v-if="activeTab === 'products'" class="space-y-6">
      <div class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">Add New Product</h2>
        <form @submit.prevent="createProduct" class="space-y-3">
          <div>
            <label for="productName" class="block mb-1 font-medium">Name</label>
            <input type="text" id="productName" v-model="productForm.name" required 
                   class="form-input" />
          </div>
          <div>
            <label for="description" class="block mb-1 font-medium">Description</label>
            <textarea id="description" v-model="productForm.description" 
                      class="form-input"></textarea>
          </div>
          <div>
            <label for="price" class="block mb-1 font-medium">Price</label>
            <input type="number" id="price" v-model="productForm.price" required 
                   class="form-input" />
          </div>
          <button type="submit" class="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
      
      <div class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">Products List</h2>
        <div v-if="loadingProducts" class="text-center py-4 text-gray-600">Loading products...</div>
        <div v-else-if="products.length === 0" class="text-center py-4 text-gray-600">No products found</div>
        <table v-else class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left font-medium">ID</th>
              <th class="p-2 text-left font-medium">Name</th>
              <th class="p-2 text-left font-medium">Price</th>
              <th class="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="border-t hover:bg-gray-50">
              <td class="p-2">{{ product.id }}</td>
              <td class="p-2">{{ product.name }}</td>
              <td class="p-2">${{ product.price }}</td>
              <td class="p-2">
                <button @click="getProductDetails(product.id)" class="text-primary-600 hover:text-primary-800 underline">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="selectedProduct" class="card">
        <h2 class="text-xl font-semibold mb-4 text-primary-700">Product Details</h2>
        <div class="space-y-2">
          <p><strong class="text-gray-700">ID:</strong> {{ selectedProduct.id }}</p>
          <p><strong class="text-gray-700">Name:</strong> {{ selectedProduct.name }}</p>
          <p><strong class="text-gray-700">Description:</strong> {{ selectedProduct.description }}</p>
          <p><strong class="text-gray-700">Price:</strong> ${{ selectedProduct.price }}</p>
          <p><strong class="text-gray-700">Created At:</strong> {{ new Date(selectedProduct.createdAt).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('users')

// Users
const users = ref([])
const selectedUser = ref(null)
const loadingUsers = ref(true)
const userForm = ref({
  name: '',
  email: '',
  password: ''
})

// Products
const products = ref([])
const selectedProduct = ref(null)
const loadingProducts = ref(true)
const productForm = ref({
  name: '',
  description: '',
  price: 0
})

// Fetch users on component mount
onMounted(async () => {
  await fetchUsers()
})

// Watch for tab changes to load appropriate data
watch(activeTab, async (newTab) => {
  if (newTab === 'users') {
    await fetchUsers()
  } else if (newTab === 'products') {
    await fetchProducts()
  }
})

async function fetchUsers() {
  loadingUsers.value = true
  try {
    const { data } = await useFetch('/api/users')
    users.value = data.value || []
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loadingUsers.value = false
  }
}

async function fetchProducts() {
  loadingProducts.value = true
  try {
    const { data } = await useFetch('/api/products')
    products.value = data.value || []
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loadingProducts.value = false
  }
}

async function createUser() {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: userForm.value
    })
    
    // Reset form and refresh user list
    userForm.value = {
      name: '',
      email: '',
      password: ''
    }
    await fetchUsers()
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function createProduct() {
  try {
    await $fetch('/api/products', {
      method: 'POST',
      body: productForm.value
    })
    
    // Reset form and refresh product list
    productForm.value = {
      name: '',
      description: '',
      price: 0
    }
    await fetchProducts()
  } catch (error) {
    console.error('Error creating product:', error)
  }
}

async function getUserDetails(id) {
  try {
    const { data } = await useFetch(`/api/users/${id}`)
    selectedUser.value = data.value
  } catch (error) {
    console.error('Error fetching user details:', error)
  }
}

async function getProductDetails(id) {
  try {
    const { data } = await useFetch(`/api/products/${id}`)
    selectedProduct.value = data.value
  } catch (error) {
    console.error('Error fetching product details:', error)
  }
}
</script>

<!-- No need for style import as Tailwind CSS is now configured via the module -->
