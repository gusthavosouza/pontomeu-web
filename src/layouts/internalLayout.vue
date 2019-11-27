

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
            <v-list-item v-for="item in items" :key="item.title" link @click="viewCompany(item)">
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
        <v-app-bar-nav-icon @click.stop="drawer=! drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Pontomeu</v-toolbar-title>

        <v-spacer></v-spacer>

        <span v-if="userModel">
            Olá, {{ userModel.name }}
        </span>

        <span v-else> ... </span>

        <v-menu left bottom transition="slide-x-transition">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list shaped>
                <v-list-item @click="() => {}" v-show="userModel">

                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="() => {}" v-show="id">

                  <v-list-item-icon>
                    <v-icon>mdi-file</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Relatórios</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="() => { logout(); }">

                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Sair</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-content>
        <v-container fluid>
            <router-view />
        </v-container>
    </v-content>

    <v-footer app>
        <span class="center">Pontomeu &copy; 2019</span>
    </v-footer>

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
                                <v-text-field label="Nome da empresa*" v-model="companyModel.name" required :rules="nameRules"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogStart" v-model="modalStart" :return-value.sync="companyModel.startAsString" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="companyModel.startAsString" label="Entrada *" prepend-icon="mdi-timer" readonly v-on="on" required :rules="startRules"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalStart" v-model="companyModel.startAsString" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalStart=false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogStart.save(companyModel.startAsString)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogEnd" v-model="modalEnd" :return-value.sync="companyModel.endAsString" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="companyModel.endAsString" label="Saída *" prepend-icon="mdi-timer" readonly v-on="on" required :rules="endRules"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalEnd" v-model="companyModel.endAsString" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalEnd=false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogEnd.save(companyModel.endAsString)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogLunch" v-model="modalLunch" :return-value.sync="companyModel.lunchAsString" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="companyModel.lunchAsString" label="Tempo de almoço" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalLunch" v-model="companyModel.lunchAsString" full-width format="24hr">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalLunch=false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogLunch.save(companyModel.lunchAsString)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12">
                                <v-switch v-model="companyModel.calculateLunch" class="ma-2" label="Calcular horário de almoço"></v-switch>
                            </v-col>

                            <v-col cols="12" v-if="msg">
                                <span class="text-red"> {{ msg }} </span>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>* Campos obrigatórios</small>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog=false">Fechar</v-btn>
                <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>

</v-app>

</template>

<script>

import {
    user
}
from '@/services/user'

import {
    company
}
from '@/services/company'

import { companyModel } from '@/models/companyModel'

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
        msg: '',
        drawer: null,
        items: null,
        error: false,
        dialog: false,
        valid: true,
        modalStart: false,
        modalEnd: false,
        modalLunch: null,
        id: null,
        userModel: null,
        companyModel: companyModel
    }),

    mounted() {
        this.loadCompanies();
        this.loadUser();
    },

    methods: {
        validate() {
                if (this.$refs.form.validate()) { // send the form if is valid
                    this.overlay = true;
                    this.postNewCompany();
                }
            },

            viewCompany(item) {
                this.id = item.id;
                const path = '/secure/' + this.id;
                if (this.$route.path !== path) {
                  this.$router.push(path);
                }
            },

            postNewCompany() {

              this.companyModel.userId = 0;
              this.companyModel.start = this.formatTimeToMinutes(this.companyModel.startAsString);
              this.companyModel.end = this.formatTimeToMinutes(this.companyModel.endAsString);
              this.companyModel.lunch = this.formatTimeToMinutes(this.companyModel.lunchAsString);

              company.post(companyModel).then(response => {
                  this.overlay = false;
                  this.dialog = false;

                  var drawerItem = {
                      id: response.data.id,
                      title: (response.data.id + ' - ' + companyModel.name),
                      icon: 'mdi-desktop-tower'
                  };

                  if (!this.items) {
                      this.items = [];
                  }

                  this.items.push(drawerItem);

              }).catch(() => {
                  this.overlay = false;
                  this.msg = 'Ocorreu um erro ao processar sua requisição. Tente novamente em alguns instantes.';
              });
            },

            loadCompanies() {
                user.getCompanies().then(response => {
                    this.items = response.data.results.map((item) => {
                        return {
                            id: item.id,
                            title: (item.id + ' - ' + item.name),
                            icon: 'mdi-desktop-tower'
                        }
                    });
                }).catch(() => {
                    this.error = true;
                });
            },

            loadUser() {
                user.getUser().then(response => {
                    this.userModel = response.data
                  }).catch(() => {
                    this.userModel = null;
                });
            },

            logout() {
              user.logout();
              this.$router.push('/login');
            },

            formatTimeToMinutes(timeStr) {
                if (timeStr) {
                    var splitedTime = timeStr.split(':');
                    if (splitedTime.length == 2) {
                        return (parseInt(splitedTime[0]) * 60) + parseInt(splitedTime[1]);
                    }
                }
                return 0;
            }
    }
}

</script>
