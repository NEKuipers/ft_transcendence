<template>
    <div class="userachievement">
      <h3>Achievements</h3>
        <ul  v-for="achievement in achievements" :key="achievement.id">
            <img v-if="filter(achievement.id)" class="scudetto" src="../assets/scudetto.png"> 
            <img v-else class="grey-scudetto" src="../assets/scudetto.png">
            <div v-if="filter(achievement.id)" class="achieved">
                <p> {{ achievement.name }}: {{ achievement.description }}</p>
            </div>
            <div v-else  class="notachieved">
                <p> {{ achievement.name }}: {{ achievement.description }}</p>
            </div>
        </ul>
        <!-- <ul>
            <img class="test" src="../assets/scudetto.png">
            <div class="tester">
                <h4>Extra Champion: win 10 games in a row</h4>
            </div>
        </ul> -->
       
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
            achievements: null as null | any,
            obtained: null as null | Array<any>
        }
    },
    mounted() {
        fetch('/api/achievements')
        .then(res => res.json())
        .then(data => {this.achievements = data;})
        .catch(err => { this.achievements = null; console.log(err)})
    },
    // This will refetch the achievements as they are obtained
    watch: {
        user: {
            handler(id) {
                if (!id) { return; }

                fetch('/api/achievements/user/' + id)
                .then(res => res.json())
                .then(data => {
					this.obtained = []	// Clear the obtained list, as this function can be called multiple times if the user changes, we do not want to keep the obtained values of the old user
                    for (let elem of data) {
                        this.obtained.push(elem.achievement_id);
                        // console.log('The id', elem.achievement_id)
                    }
                    // console.log('Well then:', this.obtained)
                })
                .catch(err => { console.log(err)})
            },
            immediate: true
        }
    },
    methods: {
        filter(achiev_id: number): boolean {
            // console.log('Number checked is', achiev_id)
            // console.log('The obtained achievements by id', this.obtained)
            // return this.obtained.find(achiev_id) === true ? true : false
            // for (const num in this.obtained) {
            //     if (achiev_id === num)
            //         return true
            // }
            // return false

			if (!this.obtained) {
				return false;
			}
			return this.obtained.includes(achiev_id)
        }
    }
})

</script>

<style scoped>

.userachievement {
    display: table;
}

.grey-scudetto {
    width: 60px;
    height: 80px;
    border-radius: 10px;
    filter: grayscale(100%);
}

.notachieved {
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

.scudetto {
    width: 60px;
    height: 80px;
    border-radius: 10px;
}

.achieved {
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