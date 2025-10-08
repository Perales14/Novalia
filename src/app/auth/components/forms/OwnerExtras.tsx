import TextField from "../../../../shared/components/fields/TextField";

type Props = {
  register: any;
  errors: Record<string, any>;
};

export default function OwnerExtras({ register, errors }: Props) {
  return (
    <div className="col">
      <TextField
        label="Nombre de la organización"
        placeholder="Ej. Inmobiliaria Novalia"
        error={errors.org_name?.message}
        {...register("org_name")}
      />
    </div>
  );
}
