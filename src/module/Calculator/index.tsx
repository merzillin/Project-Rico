import z from "zod";
import { useState } from "react";
import { Button } from "../../component/Button";
import { Form } from "../../component/Form";
import { Input, InputNumber } from "../../component/Input";

const formSchema = z.object({
  equation: z.string().min(1, "Equation Required"),
});

export default function Calculator() {
  const [variables, setVariables] = useState<string[]>([]);
  const [equation, setEquation] = useState("");
  const [values, setValues] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<number | null>(null);

  const handleEquationSubmit = (data: { equation: string }) => {
    setEquation(data.equation);
    setResult(null)

    const vars = Array.from(new Set(data.equation.match(/[a-zA-Z]+/g) || []));
    setVariables(vars);

    if (vars.length === 0) {
      try {
        const res = new Function(`return ${data.equation}`)();
        setResult(res);
      } catch {
        setResult(NaN);
      }
    } else {
      setValues({});
      setResult(null);
    }
  };

  const handleVariablesSubmit = (newValues: { [key: string]: number }) => {
    try {
      const expr = equation.replace(/[a-zA-Z]+/g, (match) => {
        return newValues[match]?.toString() ?? "0";
      });
      const res = new Function(`return ${expr}`)();
      setResult(res);
    } catch {
      setResult(NaN);
    }
  };

  return (
    <div>
      <h2>Dynamic Equation Calculator</h2>

      <Form
        validationSchema={formSchema}
        onSubmit={handleEquationSubmit}
        label="Enter Equation"
      >
        <Input label="Equation" placeholder="e.g. a + b" name="equation" />
        <Button label="Next" />
      </Form>

      {variables.length > 0 && (
        <div className="max-w-md mx-auto p-4 border rounded-md shadow space-y-4">
          {variables.map((v, index) => (
            <InputNumber
              key={index}
              label={'Enter '+v}
              value={values[v] ?? 0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const updatedValues = { ...values, [v]: Number(e.target.value) };
                setValues(updatedValues);
                handleVariablesSubmit(updatedValues);
              }}
            />
          ))}
          {result !== null && (
            <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
              Result: {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
}