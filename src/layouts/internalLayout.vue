

<template>

<v-app>

    <v-navigation-drawer v-model="drawer" app clipped>

        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    <div class="text-center">
                        <v-btn class="ma-2" outlined color="indigo" @click="dialog = true">
                            <v-icon left>mdi-plus</v-icon> Nova empresa</v-btn>
                    </div>
                </v-list-item-title>

            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Pontomeu</v-toolbar-title>
    </v-app-bar>

    <v-content>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-content>

    <v-footer app>
        <span class="center">Pontomeu &copy; 2019</span>
    </v-footer>

    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Cadastrar Empresa</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nome da empresa*" required :rules="nameRules"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-dialog ref="dialogStart" v-model="modalStart" :return-value.sync="start" persistent width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="start" label="Entrada *" prepend-icon="mdi-timer" readonly v-on="on" required :rules="startRules"></v-text-field>
                                        </template>
                                        <v-time-picker v-if="modalStart" v-model="start" full-width>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="modalStart = false">Cancelar</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialogStart.save(start)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-dialog ref="dialogEnd" v-model="modalEnd" :return-value.sync="end" persistent width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="end" label="Saída *" prepend-icon="mdi-timer" readonly v-on="on" required :rules="endRules"></v-text-field>
                                        </template>
                                        <v-time-picker v-if="modalEnd" v-model="end" full-width>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="modalEnd = false">Cancelar</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialogEnd.save(end)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-dialog ref="dialogLunch" v-model="modalLunch" :return-value.sync="lunchStart" persistent width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="lunchStart" label="Tempo de almoço" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
                                        </template>
                                        <v-time-picker v-if="modalLunch" v-model="lunchStart" full-width format="24hr">
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="modalLunch = false">Cancelar</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialogLunch.save(lunchStart)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-col>

                                <v-col cols="12">
                                    <v-switch v-model="calculateLunch" class="ma-2" label="Calcular horário de almoço"></v-switch>
                                </v-col>

                            </v-row>
                        </v-container>
                        <small>* Campos obrigatórios</small>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-row>

</v-app>

</template>

<script>

import {
    user
}
from '@/services/user'

export default {

    data: () => ({
        nameRules: [
            v => !!v || 'Por favor informe o nome da empresa'
        ],
        startRules: [
            v => !!v || 'Por favor informe o horário de entrada'
        ],

        endRules: [
            v => !!v || 'Por favor informe o horário de saída'
        ],
        drawer: null,
        items: null,
        error: false,
        dialog: false,
        valid: true,
        start: null,
        end: null,
        modalStart: false,
        modalEnd: false,

        modalLunch: null,
        lunchStart: null,
        calculateLunch: false
    }),

    mounted() {
      this.loadCompanies();
    },

    methods: {
        validate() {
            if (this.$refs.form.validate()) { // send the form if is valid
                this.overlay = true;
                this.makeLogin();
                // this.$refs.spinner.showOverlay();
            }
        },

        loadCompanies() {
          user.getCompanies().then(response => {
              this.items = response.data
          }).catch(() => {
              this.error = true;
          });
        }
    }
}

</script>
