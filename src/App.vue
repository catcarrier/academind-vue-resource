<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label for="">Mail</label>
                    <input type="text" class="form-control" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <br><br>
                <button class="btn btn-primary" @click="fetch">Fetch</button>
                <br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="u in users">{{ u.username }} | {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        username: "",
        email: ""
      },
      users: [],
      resource: {}
    };
  },
  methods: {
    submit: function() {
    //   this.$http
    //     .post("data.json", this.user)
    //     .then(
    //       response => {
    //         this.fetch();
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
        const params = {};
        // this.resource.save(params, this.user);
        this.resource.saveAlt(params, this.user);

    },
    fetch: function(){
        this.$http
            .get("data.json") // root path is defined in main.js
            .then( 
                response => {
                    return response.json(); // helper method from vue-resource, returns Promise
                }, 
                error => { 
                    console.log("the error is ", error)
                })
            .then( 
                parsedData => {
                    console.log(parsedData);
                    const newUsers = [];
                    var keys = Object.keys(parsedData);
                    for(var i = 0;i<keys.length;i++){
                        var key = keys[i];
                        newUsers.push( parsedData[key] )
                    }
                    this.users = newUsers;
            })
    }
  },
  created: function(){
      const customActions = {
          saveAlt: {
              method:'POST',
              url: 'alternative.json'
          }
      };
      const varData = {};
      this.resource = this.$resource('data.json', varData, customActions);
  }
};
</script>

<style>
</style>
