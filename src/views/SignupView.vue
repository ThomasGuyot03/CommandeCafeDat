<template>
    <div class="home">
        <h1 class="title">Inscription</h1>
        <div class="notification is-dark text-align-center">
            Commandez le meilleur de notre café !
        </div>
        <div class="signup-page">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4-tablet is-4-desktop is-3-widescreen">
                        <div class="box">
                            <form @submit.prevent="signup">
                                <div class="field">
                                    <label class="label">Prénom</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="firstname" placeholder="Prénom" @input="sanitizeInput('firstname')">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Nom</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="name" placeholder="Nom" @input="sanitizeInput('name')">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Société</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="company" placeholder="Entreprise">
                                    </div>
                                </div>
                                <!-- Ajout des champs d'adresse -->
                                <div class="field">
                                    <label class="label">Adresse</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="line" placeholder="Adresse">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Code postal</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="zip_code" placeholder="Code postal">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Ville</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="city" placeholder="Ville">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Adresse e-mail</label>
                                    <div class="control">
                                        <input class="input" type="email" v-model="email" placeholder="Exemple@exemple.com">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Mot de passe</label>
                                    <div class="control">
                                        <input class="input" type="password" v-model="password" placeholder="*******">
                                    </div>
                                </div>
                                <div class="field">
                                    <div v-if="errorMessage" class="error-message">
                                        {{ errorMessage }}
                                    </div>
                                    <div class="control">
                                        <button class="button is-primary is-fullwidth" type="submit">Créer un compte</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstname: null,
            name: null,
            email: null,
            password: null,
            errorMessage: null,
            line: null,
            zip_code: null,
            city: null,
            country: "France",
            company: null
        }
    },
    methods: {
        sanitizeInput(field) {
            // Remplace les caractères dangereux
            this[field] = this[field].replace(/[^a-zA-ZÀ-ÿ '-]/g, '');
        },
        async signup() {
            try {
                // Validation des champs
                if (!this.firstname || !this.name || !this.email || !this.password) {
                    this.errorMessage = "Veuillez remplir tous les champs.";
                    this.showToast('error', this.errorMessage); // Affiche un toast pour les champs manquants
                    return;
                }

                const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!emailRegex.test(this.email)) {
                    this.errorMessage = "Veuillez entrer une adresse email valide.";
                    this.showToast('error', this.errorMessage); // Affiche un toast pour une adresse email non valide
                    return;
                }

                const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;
                if (!PASSWORD_REGEX.test(this.password)) {
                    this.errorMessage = "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre et un chiffre.";
                    this.showToast('error', this.errorMessage); // Affiche un toast pour un mot de passe non valide
                    return;
                }

                // Création des paramètres d'inscription
                const params = {
                    firstname: this.firstname,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    accountId: this.$appConfig.accountId,
                    address: {
                        line: this.line,
                        zip_code: this.zip_code,
                        city: this.city,
                        country: this.country
                    },
                    company: this.company
                };

                // Requête d'inscription
                const response = await this.$http.post('/user/signup', params);

                // Si la requête est réussie
                if (response.status === 201) {
                    this.showToast('success', 'Inscription réussie !'); // Affiche un toast pour succès
                    this.$router.push('/login');
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    // Erreur 409 : Conflit (par exemple, adresse e-mail déjà utilisée)
                    this.showToast('error', "L'adresse e-mail est déjà utilisée.");
                } else {
                    // Pour toute autre erreur
                    this.showToast('error', "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
                }
                console.error(error);
            }
        }
    }
}
</script>


  
<style scoped>
.signup-page {
display: flex;
justify-content: center;
padding: 3rem 3rem;
}

.is-left {
text-align: inherit;
}
.box {
padding: 2rem;
}

.button {
margin-top: 1.5rem;
}
</style>
