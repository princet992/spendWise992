import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Funnel, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { category } from "@/constants/expanseCategory";
import { paymentMethod } from "@/constants/paymentMethod";
import { dates } from "@/constants/selecteDate";
import { useForm, Controller } from "react-hook-form";

const FilterExpanse = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      category: "",
      payment: "",
      date: "",
    },
  });
  const formSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Card className="p-3 mb-6">
        <div className="flex items-center gap-2 ">
          <Funnel />
          <h2 className="text-2xl font-bold">Filters & Search</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit(formSubmit)} className="grid md:grid-cols-2  lg:grid-cols-4 gap-5">
            <div className="relative">
              <Input type="text" placeholder="Search expenses..." className="ps-8" {...register("text")} />
              <Search className="absolute top-2 left-1 h-5 w-5 text-slate-500" />
            </div>
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {category.map((c) => (
                          <SelectItem value={c.label} key={c.id}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Controller
                name="payment"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {paymentMethod.map((pay) => (
                          <SelectItem value={pay.label} key={pay.id}>
                            {pay.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dates.map((date) => (
                          <SelectItem value={date.title} key={date.id}>
                            {date.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default FilterExpanse;
