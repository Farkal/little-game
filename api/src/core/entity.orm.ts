import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityOrm {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  id!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
  })
  createdAt!: Date;
}
