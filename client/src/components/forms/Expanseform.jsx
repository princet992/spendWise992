import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentMethod } from "@/constants/paymentMethod";
import { category } from "@/constants/expanseCategory";
import { useForm, Controller } from "react-hook-form";
import { useCreateExpanseDataMutation } from "@/services/expanseApi";
import { format } from "date-fns";

const ExpanseForm = () => {
  const [createExpanse, { isSuccess, isLoading }] = useCreateExpanseDataMutation();
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
      const res = await createExpanse(data);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className=" bg-[#eff6ff] px-5">
        <div className="max-w-2xl mx-auto  py-10">
          <div className="flex gap-4 items-center ">
            <Link to="/">
              <div className="border h-10 w-10 flex items-center justify-center p-1 rounded bg-white">
                <MoveLeft />
              </div>
            </Link>
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-bold">
                <Plus className="text-[#19af25] h-8 w-8 " /> Add New Expense
              </h2>
              <p className="py-2">Track your spending and stay on budget</p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center gap-2 my-2">
                  <Plus className="bg-gradient-to-br from-[#0a93a5] to-[#168ed3] rounded text-white" /> Add New Expense
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid gap-5 text-slate-700 ">
                        <Label htmlFor="title">Expense Title *</Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="e.g., Lunch at cafe"
                          className="px-2"
                          {...register("title", { required: "title is required" })}
                        />
                      </div>
                      <div className="grid gap-5 text-slate-700 ">
                        <Label htmlFor="amount">Amount ($) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          className="px-2"
                          {...register("amount", { required: "Amount is required" })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid gap-5 text-slate-700 ">
                        <Label htmlFor="category">Category *</Label>
                        <Controller
                          name="category"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Category" className="w-full" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {category.map((method) => (
                                    <SelectItem value={method.label} key={method.id}>
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
                      <div className="grid gap-5 text-slate-700 ">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Controller
                          name="payment"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a payment method" className="w-full" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {paymentMethod.map((method) => (
                                    <SelectItem value={method.label} key={method.id}>
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
                    <div className="grid gap-5 text-slate-700 ">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        // defaultValues={today}
                        className="px-2"
                        {...register("date", { required: "date is required" })}
                      />
                    </div>
                    <div className="grid gap-5 text-slate-700 ">
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
                          <Switch id="recurring-expense" checked={field.value} onCheckedChange={field.onChange} />
                        )}
                      />
                      <Label htmlFor="recurring-expense">This is a recurring expense</Label>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <Link to="/">
                        <Button type="button" variant="outline" className="">
                          <MoveLeft /> Cancel
                        </Button>
                      </Link>
                      <Button type="submit" className=" bg-[#096b92]">
                        {isLoading ? "Saving..." : "Save Expense"}
                      </Button>
                    </div>
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
