import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  @Input('titulo') titulo: String = '';
  @Input('opcoes') opcoes: Array<any> = [];
  @Input('escolhaAte') escolhaAte: number = 1;
  public form: FormGroup = new FormGroup({});
  public selectedItems: number = 0;
  counter: number = 0;
  maxNo = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.mapOpcoes();
    this.initForm();
  }

  public checkIfOptionsCanBeMultiple() {
    return this.escolhaAte > 1;
  }

  private initForm() {
    if (this.checkIfOptionsCanBeMultiple()) {
      this.form = this._fb.group({
        opcao: this._fb.array(
          this.opcoes.map((s) => this._fb.control(false)),
          [Validators.minLength(1), Validators.maxLength(this.escolhaAte)]
        ),
      });
    } else {
      this.form = this._fb.group({
        opcao: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(this.escolhaAte),
          ]),
        ],
        // opcao: this._fb.array(this.opcoes.map((x) => false)),
      });
    }
  }

  amt = 0;

  onChange(option: any) {
    if (option.checked)
      this.amt++
    else 
      this.amt--
    this.amt === this.escolhaAte ? this.maxNo = true : this.maxNo = false;
  }

  private mapOpcoes() {
    this.opcoes = this.opcoes.map((opcao) => {
      return { name: opcao, value: opcao, checked: false };
    });
  }
}
