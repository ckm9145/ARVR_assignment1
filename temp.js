//when page is loaded


window.onload= function(e) {


    new Vue({


        template: 
        `
        <div id="app">
            Connor's Farming Game

            <h3>Day: {{day}} </h3>
            <div>{{reputationLevel}}- level collector </div>

            <table>
                <tr class= "currency">
                    <td> Money: </td>
                    <td>{{money}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> Art: </td>
                    <td>{{art}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> Energy: </td>
                    <td>{{energy}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> Reputation: </td>
                    <td>{{reputation }}</td>
                    <td>{{(reputationrate*100).toFixed(2)}}% per day</td>



                </tr>
            </table>
            <div>

                <button @click= "buyonlineart">Buy Art Online</button>
                <button @click="buygoodwillart" :disabled="energy < 20">To go Goodwill</button>
                <button @click= "rent" v-if="reputationLevel >= 1">Rent</button>


            </div>

            <div id="eventLog">
                EVENTS!

                <div v-for="event in eventsTODISPLAY">

                    {{event}}
                </div>

            </div>

        
        </div>`
        ,

        computed: {

            eventsTODISPLAY (){

                return this.events.slice().reverse()

            },

            reputationLevel() {
                console.log("compute reputation")

                return Math.floor(this.reputation/10)
            },

            reputationrate() {
                return this.art*.1
            }


        },

        watch: {

            reputationLevel(){
                console.log("rep changes")
                this.events.push("emoji")
            },

            money() {

                if (this.money < 10 ) {
                    this.getfreeart()
                }

            }


        },

        methods: {

            getfreeart(){
                this.art+=1

                let text= "a freind gives you art"
                this.events.push(text)

            },

            rent(){
                console.log("you rent gallery")
            },


            buyonlineart(){

                //what happens why buy art
                //lost money
                //

                let price = 10
                let artq = 1


                if (this.money >= price ){

                    const output = `you buy ${artq} art for $${price}`
                    this.events.push(output)
                    console.log("you buy art online")
                    this.money -= price
                    this.arts += artq

                }

                else {
                    const output = `you cant afford ${artq} art for $${price}`
                    this.events.push(output)

                    console.log("you cant afford it")
                }
               
            },

            buygoodwillart(){
                console.log("you buy art at goodwill")
                
                this.energy-= 10

                const MAX_ART = 5;
                const max_art_price = 10;

                let artquant = Math.floor(MAX_ART * Math.random());

                let priceperart = max_art_price * Math.random() * artquant;

                let price = Math.floor(priceperart * Math.random * artquant);

            


                if (this.money >= price ){
                    console.log("you buy art online")

                    console.log(`You buy online ${artquant} art at goodwill for $${price}`);
                    this.money -= price
                    this.arts += artq

                }

                else {
                    console.log("you cant afford it")
                }


            }


        },

        mounted() {

            console.log("start vue")
            setInterval(() => {
                console.log("tick")
                this.day++
                this.reputation+= this.reputationrate

                this.energy++
                this.energy = Math.min(this.energy, this.MAXenergy)

                if (Math.random() < .1) {
                    console.log("Free ART")
                    this.getfreeart()
                }


            }, 1000)


        },

        data() {
            //currencies if you get to certain point then able to buy more
            return {
                day:0,
                money:1000000,
                art: 0,
                reputation:0,
                energy:100,
                MAXenergy:200,
                

                //array of events

                events: ["you start collecting art"]

            }


        },

        el: "#app"
    })
}