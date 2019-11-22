

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
                    <span class="headline">Empresa</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nome" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogStart" v-model="modalStart" :return-value.sync="start" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="start" label="Início" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
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
                                        <v-text-field v-model="end" label="Fim" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalEnd" v-model="end" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalEnd = false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogEnd.save(end)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogLunchStart" v-model="modalLunchStart" :return-value.sync="lunchStart" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="lunchStart" label="Almoço Saída" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalLunchStart" v-model="lunchStart" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalLunchStart = false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogLunchStart.save(lunchStart)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-dialog ref="dialogLunchEnd" v-model="modalLunchEnd" :return-value.sync="lunchEnd" persistent width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="lunchEnd" label="Almoço Retorno" prepend-icon="mdi-timer" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker v-if="modalLunchEnd" v-model="lunchEnd" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modalLunchEnd = false">Cancelar</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialogLunchEnd.save(lunchEnd)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field label="Email*" required></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Salvar</v-btn>
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
        drawer: null,
        items: null,
        error: false,
        dialog: false,

        start: null,
        end: null,

        lunchStart: null,
        lunchEnd: null,

        modalStart: false,
        modalEnd: false,

        modalLunchStart: false,
        modalLunchEnd: false
    }),

    mounted() {
        user.getCompanies().then(response => {
            this.items = response.data
        }).catch(() => {
            this.error = true;
        });
    }
}

</script>
