<script setup>
    // import ref
    import { ref, onMounted } from "vue";

    // import router
    import { useRouter, useRoute } from "vue-router";

    // import api
    import api from "../../api";

    // init router
    const router = useRouter();

    // init route
    const route = useRoute();

    // define state
    const image = ref("");
    const title = ref("");
    const content = ref("");
    // old image
    const oldImage = ref("");
    const errors = ref([]);

    // onMounted
    onMounted( async () => {
        // fetch detail data post by ID
        await api.get(`/api/posts/${route.params.id}`)
        .then(response => {
            // set response data to state
            title.value = response.data.data.title
            content.value = response.data.data.content
            // old image
            oldImage.value = response.data.data.image;
        });
    })

    // method for handle file changes
    const handleFileChange = (e) => {
        // assign file to state
        image.value = e.target.files[0];
    };

    // method "updatePost"
    const updatePost = async () => {
        // init formData
        let formData = new FormData();

        // assign state value to formData
        formData.append("image", image.value);
        formData.append("title", title.value);
        formData.append("content", content.value);
        formData.append("_method", "PATCH");

        // store data with API
        await api.post(`/api/posts/${route.params.id}`, formData)
        .then(() => {
            // redirect
            router.push({path: "/posts"});
        })
        .catch((error) => {
            // assign response error data to state "errors"
            errors.value = error.response.data;
        });
    };
    // back button
    const goBack = () => {
        router.push({ path: "/posts" });
    };
</script>

<template>
 <div class="container mt-5 mb-5">
     <div class="row">
         <div class="col-md-12">
             <div class="card border-0 rounded shadow">
                 <div class="card-body">
                    <form @submit.prevent="updatePost()">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Image</label>
                            <div v-if="oldImage" class="mb-3">
                                <p>Old Image : </p>
                                <img :src="oldImage" alt="Old Image" class="img-fluid" style="max-width: 300px;max-height: 200px;">
                            </div>
                            <input type="file" class="form-control" @change="handleFileChange($event)">
                            <div v-if="errors.image" class="alert alert-danger mt-2">
                                <span>{{ errors.image[0] }}</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Title</label>
                            <input type="text" class="form-control" v-model="title" placeholder="Title Post">
                            <div v-if="errors.title" class="alert alert-danger mt-2">
                                <span>{{ errors.title[0] }}</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Content</label>
                            <textarea class="form-control" v-model="content" rows="5" placeholder="Content Post"></textarea>
                            <div v-if="errors.content" class="alert alert-danger mt-2">
                                <span>{{ errors.content[0] }}</span>
                            </div>
                        </div>
                        <button @click="goBack" class="btn btn-md btn-secondary rounded-sm shadow border-0 me-2">
                            &laquo; Back
                        </button>
                        <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                    </form>
                 </div>
             </div>
         </div>
     </div>
 </div>
</template>