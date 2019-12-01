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

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-input> De </v-input>
            <v-text-field v-model="fields.dateStart.value" placeholder="dd/MM/yyyy" prepend-icon="mdi-calendar" readonly @click="saveRef(fields.dateStart); showModalDate()" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-input> Até </v-input>
            <v-text-field v-model="fields.dateStart.value" placeholder="dd/MM/yyyy" prepend-icon="mdi-calendar" readonly @click="saveRef(fields.dateStart); showModalDate()" />
        </v-col>

          <v-col cols="12" sm="6" md="4" >
            <v-input />
            <v-btn class="mr-4"> Buscar </v-btn>
          </v-col>
      </v-row>
    </v-container>

    <v-spacer />

    <div v-if="items">
        <v-list>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.id"></v-list-item-title>
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

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.dateStart.value" label="Dia" prepend-icon="mdi-calendar" readonly @click="saveRef(fields.dateStart); showModalDate()" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.timeStart.value" label="Hora" prepend-icon="mdi-timer" readonly @click="saveRef(fields.timeStart); showModalTime();" />
                  </v-col>

                  <v-col cols="12">
                    <span> Almoço ou Janta * </span>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.lunchStartTime.value" label="Horário Saída" prepend-icon="mdi-timer" readonly @click="saveRef(fields.lunchStartTime); showModalTime();" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.lunchEndTime.value" label="Horário Retorno" prepend-icon="mdi-timer" readonly @click="saveRef(fields.lunchEndTime); showModalTime();" />
                  </v-col>

                  <v-col cols="12">
                    <span> Saída * </span>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.dateEnd.value" label="Dia" prepend-icon="mdi-calendar" readonly @click="saveRef(fields.dateEnd); showModalDate();" />
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fields.timeEnd.value" label="Hora" prepend-icon="mdi-timer" readonly @click="saveRef(fields.timeEnd); showModalTime();" />
                  </v-col>

                </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog=false">Fechar </v-btn>
          <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-dialog ref="dialogRefDate" v-model="modalDate" :return-value.sync="dateRef" persistent width="290px">
      <v-date-picker v-model="dateRef" scrollable>
        <v-spacer />
        <v-btn text color="primary" @click="modalDate = false">Cancelar</v-btn>
        <v-btn text color="primary" @click="$refs.dialogRefDate.save(dateRef); saveVal(dateRef)">Salvar</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog ref="dialogRef" v-model="modalTime" :return-value.sync="timeRef" persistent width="290px">
        <v-time-picker v-model="timeRef" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalTime=false">Cancelar</v-btn>
            <v-btn text color="primary" @click="$refs.dialogRef.save(timeRef); saveVal(timeRef)">OK</v-btn>
        </v-time-picker>
    </v-dialog>
</div>

</template>

<script>

import { logdaywork } from '@/services/logdaywork'
import { LogDayWorkModel } from '@/models/LogDayWorkModel'

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
        item: null,
        error: false,
        userModel: null,
        dialog: false,

        modalDate: false,
        modalTime:false,
        dateRef: null,
        timeRef: null,
        ref: null,
        logDayWorkModel: LogDayWorkModel,
        fields: {
          dateStart:      {value: ''},
          timeStart:      {value: ''},
          lunchStartTime: {value: ''},
          lunchEndTime:   {value: ''},
          dateEnd:        {value: ''},
          timeEnd:        {value : ''}
        },

        dateRules: [
            v => !!v || 'Por favor informe o dia'
        ],

        timeRules: [
            v => !!v || 'Por favor informe o horário'
        ],
    }),
    methods: {
        saveVal(val) {
          this.ref.value = val;
          // this.ref.$el.querySelector('input').value = val;
          // this.ref.$emit('value', val);
        },

        showModalDate() {
          this.modalDate = true;
        },

        showModalTime() {
          this.modalTime = true;
        },

        saveRef(model) {
          this.ref = model;
        },
        computedValue(ref) {
          return ref && ref.value ? ref.value : '';
        },
        validate() {
          if (this.$refs.form.validate()) {
            this.makeRequestSendDayTime();
          }
        },
        makeRequestSendDayTime() {
          this.overlay = true;
          this.logDayWorkModel.companyId = this.$route.params.id;
          logdaywork.post(this.logDayWorkModel).then(response => {
              this.overlay = false;
              if (!this.items) {
                this.items = [];
              }
              this.items.push(response.data);
          }).catch(() => {
              this.overlay = false;
          });
        },
        loadWorkDay() {
            this.overlay = true;
            logdaywork.loadDayWork(this.$route.params.id).then(response => {
                this.overlay = false
                if (response.status == 200) {
                    this.items = response.data.results;
                }

            }).catch(() => {
                this.overlay = false
            });
        }
    }

}

</script>
