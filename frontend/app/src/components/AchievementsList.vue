<template>
    <div class="userachievement">
      <h3>Achievements</h3>
        <ul  v-for="item in items" :key="item.message">
            <img class="trophy" src="../assets/scudetto.png"> 
            <div class="achievementbox">
                <p>{{ item.message }}</p>
            </div>
        </ul>
        <ul>
            <img class="test" src="../assets/scudetto.png">
            <div class="tester">
                <h4>Extra Champion: win 10 games in a row</h4>
            </div>
        </ul>
       
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'AchievementsList',
    props: {
		user: {
			type: Number //You can use this.user to make requests to the db for this user. this.user is the db user id
		},
	},
    data() { 
        return {
            items: [
            {
                message: "CleanSheet: Win a game conceding no points"
            },
            {
                message: "Noob: Win a game"
            },
            {
                message: "Getting there: Win 10 games"
            },
            {
                message: "CHAD: Win 69 games"
            }
            ]
        }
    }
})

</script>

<style scoped>

.userachievement {
    display: table;
}

.trophy {
    width: 60px;
    height: 80px;
    border-radius: 10px;
    filter: grayscale(100%);
}

.achievementbox {
    border: 2px solid grey;
    border-radius: 10px;
    text-align: center;
    background-color: rgb(186, 186, 186);
    display: inline-block;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: large;
    padding: 20px;
    width: 450px;
    height: 35px;
    vertical-align: top;
    color: whitesmoke;
}

.test {
    width: 60px;
    height: 80px;
    border-radius: 10px;
}

.tester {
    border: 2px solid grey;
    border-radius: 10px;
    text-align: center;
    background-color: rgb(207, 161, 46);
    display: inline-block;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: large;
    padding: 20px;
    width: 450px;
    height: 35px;
    vertical-align: top;
    color: white;
}


</style>