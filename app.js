var app = new Vue ({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player dealt ' + damage + ' damage!'
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        monsterAttack: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage
            this.checkWin();

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster dealt ' + damage + ' damage!'
            });
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player dealt a critical for ' + damage + ' damage!'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            }
            else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player healed 10 damage!'
            });
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            // Check to see game is over by ways of monsterHealth.
            if (this.monsterHealth <= 0) {
                if (confirm('You have won. Start new game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                if (confirm('You have lost. Start new game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})