<style>

.results {
    width: 300px;
    margin: 0 auto;
    text-align: left;
    background: #eee;
    padding: 10px;
}

</style>

<template>

<div>
    <loader-spinner ref="spinner" :show="overlay" />

    <div v-if="items">
        <v-list shaped>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>

    <div v-else>
        <v-chip class="ma-2" color="blue" label text-color="white" justify-center absolute center top :style="{left: '50%', transform:'translateX(-50%)', top: '40%', position: 'absolute'}">
            Nenhum registro encontrado :(
        </v-chip>
    </div>

    <v-btn color="pink" dark absolute bottom right fab @click="dialog=true">
        <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="workId"> Atualizar dia </span>
          <span class="headline" v-else> Novo dia </span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
                <v-row>
                  <v-col cols="12">
                    <span> Entrada * </span>
                  </v-col>
                  <!-- MARK: DATA START -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.dateStart.value" label="Dia" prepend-icon="mdi-calendar" readonly required :rules="startRules" @click="saveRef(fields.dateStart)" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.timeStart.value" label="Dia" prepend-icon="mdi-calendar" readonly required :rules="startRules" @click="saveRef(fields.timeStart)" />
                  </v-col>
                  <!-- MARK: END DATA START -->

                  <v-col cols="12">
                    <span> Almoço / Janta * </span>
                  </v-col>

                  <!-- MARK: LUNCH START -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.lunchStartTime.value"  label="Saída" prepend-icon="mdi-timer" readonly required :rules="startRules" @click="saveRef(fields.lunchStartTime)" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.lunchEndTime.value"  label="Saída" prepend-icon="mdi-timer" readonly required :rules="startRules" @click="saveRef(fields.lunchEndTime)" />
                  </v-col>

                  <!-- MARK: END LUNCH -->
                  <v-col cols="12">
                    <span> Saída * </span>
                  </v-col>
                  <!-- MARK: DATA START -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.dateEnd.value" label="Dia" prepend-icon="mdi-calendar" readonly required :rules="startRules" @click="saveRef(fields.dateEnd)" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.timeEnd.value" label="Saída" prepend-icon="mdi-timer" readonly required :rules="startRules" @click="saveRef(fields.timeEnd)" />
                  </v-col>
                  <!-- MARK: END DATA START -->
                </v-row>
            </v-container>

            <v-dialog ref="dialogRefDate" v-model="modalStart" :return-value.sync="dateStart" persistent width="290px">
              <v-date-picker v-model="dateStart" scrollable>
                <v-spacer />
                <v-btn text color="primary" @click="modalStart = false">Cancelar</v-btn>
                <v-btn text color="primary" @click="$refs.dialogStart.save(dateStart)">Salvar</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-dialog ref="dialogRef" v-model="modalRef" :return-value.sync="dateRef" persistent width="290px">
                <v-time-picker v-model="dateRef" full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modalRef=false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="$refs.dialogRef.save(dateRef); saveVal(dateRef)">OK</v-btn>
                </v-time-picker>
            </v-dialog>

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog=false">Fechar </v-btn>
          <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>
</div>

</template>

<script>

import {
    logdaywork
}
from '@/services/logdaywork'

export default {
    name: 'SecureList',
    mounted: function() {
        this.loadWorkDay();
    },

    computed: {
      computedTime() {
        return this.dateRef ? this.dateRef : '';
      }
    },
    data: () => ({
        workId: null,
        overlay: false,
        valid: true,
        items: null,
        error: false,
        userModel: null,
        dialog: false,
        modalStart: false,
        modalRef: false,
        modelRef: null,
        timeRef: null,
        dateStartTime: null,
        modalStartTime: false,
        dateStart: null,
        dateRef: null,
        ref: null,

        fields: {
          dateStart: {value: ''},
          timeStart: {value: ''},
          lunchStartTime: {value: ''},
          lunchEndTime: {value: ''},
          dateEnd: {value: ''},
          timeEnd: {value : ''}
        },

        startRules: [
            v => !!v || 'Por favor informe o horário de entrada'
        ],
    }),
    methods: {
        saveVal(val) {
          this.ref.value = val;
          // this.ref.$el.querySelector('input').value = val;
          // this.ref.$emit('value', val);
        },

        saveRef(model) {
          this.modalRef = true;
          this.ref = model;
        },
        computedValue(ref) {
          return ref && ref.value ? ref.value : '';
        },
        validate() {
          alert(this.lunchStartTime);
        },
        loadWorkDay() {
            this.overlay = true;
            logdaywork.loadDayWork(this.$route.params.id).then(response => {
                this.overlay = false
                if (response.code == 200) {
                    this.items = response.data.results;
                }

            }).catch(() => {
                this.overlay = false
            });
        }
    }

}

</script>
