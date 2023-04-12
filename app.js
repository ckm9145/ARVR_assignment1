//when page is loaded


window.onload= function(e) {


    new Vue({


        template: 
        `
        <div id="app">
            Connor's Space Travel Game

            <h3>Day: {{day}} </h3>
            <h4>Number of Gallons left: {{gas}} </h4>

            <div v-if="isoutofGAS">
                <p>You have run out of gas! Please buy more gas to continue playing.</p>
            </div>
            


            <div>{{reputationLevel}}- level collector </div>

            <table>
                <tr class= "currency">
                    <td> Money: </td>
                    <td>{{money}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> alien artifact: </td>
                    <td>{{alien_artifact}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> Energy: </td>
                    <td>{{energy}}</td>

                </tr>

                <tr class= "currency"> 
                    <td> Reputation: </td>
                    <td>{{reputation.toFixed(2)}}</td>
                    <td>{{(reputationrate*100).toFixed(2)}}% per day</td>



                </tr>
            </table>
            <div>

                <button @click="Buy_alien_artifact" :disabled="energy < 20" :disabled="gas <= 0">Buy alien artifact</button>
                <button @click="buygas" :disabled="money < 15">Buy Gas</button>
                <button @click="buyResource" :disabled="money < 50"  :disabled="energy < 0" >Ship Upgrades </button>

                <button @click="buySnacks" :disabled="money < 15">Buy Snacks</button>


                <button @click="sell_art"  v-if="reputationLevel >= 1" :disabled="alien_artifact<= 0">Sell</button>

                <div v-if="isoutofEnergy">
                    <p>You are out of energy please rest up!</p>
                </div>


            </div>

            <div id="eventLog">
                

                <div v-for="event in eventsTODISPLAY">

                    {{event}}
                </div>

            </div>

        
        </div>`
        ,

        computed: {

            ismaxEnergy() {

                return this.energy >=200
            },

            isoutofEnergy(){

                return this.energy <= 0;

            },

            isoutofGAS() {
                return this.gas <= 0;
              },

            eventsTODISPLAY (){

                return this.events.slice().reverse()

            },

            reputationLevel() {
                console.log("compute reputation")

                return Math.floor(this.reputation/10)
            },

            reputationrate() {
                return this.alien_artifact*.1
            },


        },

        watch: {

            reputationLevel(){
                console.log("You are becoming a respected collector ")
                this.events.push("Congrats you leveled up 🎉")
            },

            money() {

                if (this.money < 10 ) {
                    this.getfreeart()
                }

            }

            


        },

        methods: {

            buySnacks() {

                let price = 10; 

                if (this.money >= price)
                {
                    this.energy+= 10
                    const output= `YUMMM! I love snacks. `
                    this.events.push(output)

                }
                else
                {
                    const output= `No Money for snacks :( ) `
                    this.events.push(output)
                }


            },

            buyResource() {
                this.energy-= 40

                const MAX_ART = 1;
                const max_art_price = 40;

                let artquant = Math.floor(MAX_ART * Math.random());

                let priceperart = max_art_price * Math.random() * artquant;

                let price = Math.floor(priceperart * Math.random() * artquant);

                


                if (this.money >= price  || self.energy <= 0 ){
                    console.log("you bought upgrades to your ship. Lots of energy is required to make changes ")

                    this.money -= price
                    this.alien_artifact += artquant

                    const output= `Congrats on the upgrade- light speed increased... WOOHOO. Lots of energy is required to make changes`
                    this.events.push(output)


                }

                else {
                    console.log("you cant afford it or too tired. Please save up money or rest")

                    const output = `you cant afford a new motor for your ship`
                    this.events.push(output)
                }



            },


            buygas(){

                
                if (this.money > 15){
                    this.gas+= 50
                    let text="You purchased gas. Good luck on the rest of your travels"
                    this.events.push(text)
                    this.money-=15
                }

                else{
                    console.log(`Sorry you only have $${this.money} dollars in your account. Please sell art to earn money`)
                }


            },

            getfreeart(){
                this.alien_artifact+=1
                // COME BACK TO AND MAYBE THIS CAN BE RESOURCES


                let text= "You have been rewarded for your service. You are rewarded a rare alien artifact"
                this.events.push(text)

            },

            sell_art(){
                if (this.reputationLevel >= 1)
                    {
                        this.alien_artifact--
                        this.money+= 25
                        let text= "You sold a rare alien artifact. Here is money in exchange"
                        this.events.push(text)

                       
                    }

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
                    console.log(" ")
                    this.money -= price
                    this.alien_artifact += artq

                }

                else {
                    const output = `you cant afford ${artq} alien artifact for $${price}`
                    this.events.push(output)

                    console.log("you cant afford it")
                }
               
            },

            Buy_alien_artifact(){
                
                this.energy-= 10

                const MAX_ART = 5;
                const max_art_price = 10;

                let artquant = Math.floor(MAX_ART * Math.random());

                let priceperart = max_art_price * Math.random() * artquant;

                let price = Math.floor(priceperart * Math.random() * artquant);

                


                if (this.money >= price ){
                    console.log("you bought a alien artifact")

                    console.log(`You buy online ${artquant} art at store for $${price}`);
                    this.money -= price
                    this.alien_artifact += artquant

                    const output= `You buy online ${artquant} art at store for $${price}... CONGRATS`
                    this.events.push(output)

                    this.gas-=10

                    


                }

                else {
                    console.log("you cant afford it")

                    const output = `you cant afford ${artquant} alien artifact for $${price}`
                    this.events.push(output)
                }


            }


        },

        mounted() {

            console.log("start vue")
            setInterval(() => {
                console.log("tick")
                this.day++
                this.reputation+= this.reputationrate
                // this.energy++
                this.energy = Math.min(this.energy, this.MAXenergy)

                if (Math.random() < .1) {
                    console.log("CONGRATES! YOU are a lucky Winner. You are rewarded +1 Alien Artifacts")
                    this.getfreeart()
                }

                if (this.isoutofGAS){
                    this.gas=0
                    this.energy--
                }
                else{
                    this.gas--

                }
                if (this.isoutofEnergy){
                    this.energy=0
                }
                else{
                    this.energy++

                }

                if (this.ismaxEnergy) {
                    this.energy = 200
                }

                


            }, 1000)


        },

        data() {
            //currencies if you get to certain point then able to buy more
            return {
                day:0,
                money:500,
                gas:10,
                alien_artifact: 0,
                reputation:0,
                energy:10,
                MAXenergy:200,
                

                //array of events

                events: ["you start collecting alien artifact",]

            }


        },

        el: "#app"
    })
}