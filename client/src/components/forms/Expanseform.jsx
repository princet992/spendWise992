import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paymentMethod } from "@/constants/paymentMethod";
import { category } from "@/constants/expanseCategory";
import { useForm, Controller } from "react-hook-form";
import { useCreateExpanseDataMutation } from "@/services/expanseApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ExpanseForm = () => {
  const { userId } = useSelector((state) => state.Auth);
  const [createExpanse, { isSuccess, isLoading }] =
    useCreateExpanseDataMutation();
  const navigate = useNavigate();
  // const today = new Date().toISOString().split("T")[0];
  const today = format(new Date(), "yyyy-MM-dd");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      payment: "",
      date: today,
      notes: "",
      recurring: false,
    },
  });
  const formSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        userId,
      };
      const res = await createExpanse(newData);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="  px-5">
        <div className="max-w-2xl mx-auto  py-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
            <Link to="/">
              <div className="border h-10 w-10 flex items-center justify-center p-1 rounded bg-white shadow-sm hover:shadow-md transition">
                <MoveLeft className="text-gray-600" />
              </div>
            </Link>
            <div className="flex flex-col   gap-2">
              <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-700 flex-wrap">
                <Plus className="text-[#19af25] h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
                Add New Expense
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-0">
                Track your spending and stay on budget
              </p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center gap-2 my-2">
                  <Plus className="bg-gradient-to-br from-[#0a93a5] to-[#168ed3] rounded text-white" />{" "}
                  Add New Expense
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(formSubmit)}
                  className="grid gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2 text-slate-700">
                      <Label htmlFor="title">Expense Title *</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="e.g., Lunch at cafe"
                        {...register("title", {
                          required: "Title is required",
                        })}
                      />
                    </div>
                    <div className="grid gap-2 text-slate-700">
                      <Label htmlFor="amount">Amount ($) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        {...register("amount", {
                          required: "Amount is required",
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2 text-slate-700">
                      <Label htmlFor="category">Category *</Label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {category.map((method) => (
                                  <SelectItem
                                    value={method.label}
                                    key={method.id}
                                  >
                                    <span>
                                      <method.icon />
                                    </span>
                                    {method.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="grid gap-2 text-slate-700">
                      <Label htmlFor="payment">Payment Method</Label>
                      <Controller
                        name="payment"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {paymentMethod.map((method) => (
                                  <SelectItem
                                    value={method.label}
                                    key={method.id}
                                  >
                                    <span>
                                      <method.icon />
                                    </span>{" "}
                                    {method.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2 text-slate-700">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      {...register("date", { required: "Date is required" })}
                    />
                  </div>

                  <div className="grid gap-2 text-slate-700">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional details about this expense..."
                      {...register("notes")}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Controller
                      name="recurring"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="recurring-expense"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="recurring-expense">
                      This is a recurring expense
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                    <Link to="/">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        <MoveLeft /> Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-[#096b92]"
                    >
                      {isLoading ? "Saving..." : "Save Expense"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpanseForm;
