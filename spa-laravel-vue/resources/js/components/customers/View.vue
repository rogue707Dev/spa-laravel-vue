<template>
    <div class="customer-view" v-if="customer">
        <div class="user-img">
            <!-- Imagen -->
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ customer.id }}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ customer.name }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ customer.email }}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{{ customer.phone }}</td>
                </tr>
                <tr>
                    <th>website</th>
                    <td>{{ customer.website }}</td>
                </tr>
            </table>
            <router-lin to="/customers">Back to the all customers</router-lin>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'view',
        created() {
            if(this.customers.length) {
                this.customer = this.customers.find((customer) => customer.id == this.$route.params.id);
            } else {
                axios.get(`http://127.0.0.1:8000/api/customers/${this.$route.params.id}`)
                    .then((response) => {
                        this.customer = response.data.customer
                    })
            }
            
        },
        data() {
            return {
                customer: null
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            customers() {
                return this.$store.getters.customers;
            }
        }
    }
</script>

<style scoped>
    .customer-view {
        display: flex;
        align-items: center;
    }

    .user-img {
        flex: 1;
    }

    .user-img img {
        max-width: 160px;
    }

    .user-info {
        flex: 3;
        overflow-x: scroll;
    }
</style>


