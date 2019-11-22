<style>

.text-red {
    color: red;
}

</style>

<template>

<v-app>
    <v-content>
        <loader-spinner ref="spinner" :show="overlay" />
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Pontomeu</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field label="Email" :rules="emailRules" name="email" v-model="loginModel.email" type="text" required></v-text-field>
                                <v-text-field id="password" label="Senha" :rules="passwordRules" v-model="loginModel.password" name="password" type="password" required></v-text-field>
                            </v-form>

                            <h5 v-if="error" class="text-red">Ocorreu um erro ao processar a sua requisição.</h5>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="validate">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</v-app>

</template>

<script>

import { signin } from "@/services/signin"
import { store } from "@/api/store"

export default {
    data: () => ({
        valid: true,
        error: false,
        overlay: false,
        passwordRules: [
            v => !!v || 'Por favor informe sua senha'
        ],
        emailRules: [
            v => !!v || 'Por favor informe o seu E-mail',
            v => /.+@.+\..+/.test(v) || 'Por favor informe um E-mail válido',
        ],
        loginModel: {
            email: "",
            password: ""
        }
    }),
    methods: {

        makeLogin() {
                signin.login(this.loginModel).then(response => {
                    this.error = false;
                    store.setToken(response.data);
                    this.$router.push('/secure');
                    // this.$refs.spinner.hide();
                    this.overlay = true;
                }).catch(() => {
                    this.error = true;
                    // this.$refs.spinner.hide();
                    store.setToken(null);
                    this.overlay = false;
                });
            },

            validate() {
                if (this.$refs.form.validate()) { // send the form if is valid
                    this.overlay = true;
                    this.makeLogin();
                    // this.$refs.spinner.showOverlay();
                }
            }
    }
}

</script>
