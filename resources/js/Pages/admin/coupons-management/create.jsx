import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Ticket, Calendar, Percent, DollarSign } from "lucide-react"

const breadcrumbs= [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Coupons Management',
        href: '/admin/coupons-management',
    },
    {
        title: 'Create Coupon',
        href: '/admin/coupons-management',
    }
];


export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        code: "",
        type: "",
        value: "",
        global_limit: "",
        start_date: "",
        end_date:"",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/admin/coupons-management')
    }

    const handleCancel = () => {
        router.visit("/admin/coupons-management")
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Coupon" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto ">
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Add a new discount coupon to the system</p>
                </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-foreground flex items-center gap-2">
                        <Ticket className="w-5 h-5" />
                        Basic Information
                        </h2>

                        <div className="space-y-2 mb-6">
                        <Label htmlFor="code">Coupon Code <span className="text-destructive">*</span></Label>
                        <Input
                            id="code"
                            type="text"
                            placeholder="e.g., SUMMER2024"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value.toUpperCase())}
                            className={errors.code ? "border-destructive" : ""}
                            required
                        />
                        {errors.code ? (
                            <p className="text-xs text-destructive">{errors.code}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                            Enter a unique code that customers will use at checkout
                            </p>
                        )}
                        </div>

                        <div className="space-y-2 mb-6">
                        <Label htmlFor="type">Discount Type <span className="text-destructive">*</span></Label>
                        <Select value={data.type} onValueChange={(value) => setData("type", value)}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="percentage">
                                <div className="flex items-center gap-2">
                                <Percent className="w-4 h-4" />
                                Percentage
                                </div>
                            </SelectItem>
                            <SelectItem value="fixed">
                                <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Fixed Amount
                                </div>
                            </SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Choose between percentage discount or fixed dollar amount
                        </p>
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="value">Discount Value <span className="text-destructive">*</span> {data.type === "percentage" ? "(%)" : "($)"}</Label>
                        <Input
                            id="value"
                            type="number"
                            placeholder={data.type === "percentage" ? "e.g., 20" : "e.g., 50"}
                            value={data.value}
                            onChange={(e) => setData("value", Number.parseFloat(e.target.value))}
                            className={errors.value ? "border-destructive" : ""}
                            min="0"
                            step={data.type === "percentage" ? "1" : "0.01"}
                            max={data.type === "percentage" ? "100" : undefined}
                            required
                        />
                        {errors.value ? (
                            <p className="text-xs text-destructive">{errors.value}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                            {data.type === "percentage" ? "Enter percentage off (0-100)" : "Enter dollar amount off"}
                            </p>
                        )}
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-foreground">Usage Limits</h2>

                        <div className="space-y-2">
                        <Label htmlFor="global_limit">Total Usage Limit <span className="text-destructive">*</span></Label>
                        <Input
                            id="global_limit"
                            type="number"
                            placeholder="e.g., 100"
                            value={data.global_limit}
                            onChange={(e) => setData("global_limit", Number.parseInt(e.target.value))}
                            className={errors.global_limit ? "border-destructive" : ""}
                            min="1"
                            required
                        />
                        {errors.global_limit ? (
                            <p className="text-xs text-destructive">{errors.global_limit}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                            Maximum number of times this coupon can be used across all customers
                            </p>
                        )}
                        </div>

                        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Note:</strong> Each customer can use this coupon up to 3 times
                            by default. The total usage across all customers cannot exceed the limit set above.
                        </p>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-foreground flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Validity Period
                        </h2>

                        <div className="space-y-2 mb-6">
                        <Label htmlFor="start_date">Start Date <span className="text-destructive">*</span></Label>
                        <Input
                            id="start_date"
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData("start_date", e.target.value)}
                            className={errors.start_date ? "border-destructive" : ""}
                            required
                        />
                        {errors.start_date ? (
                            <p className="text-xs text-destructive">{errors.start_date}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">When the coupon becomes active and usable</p>
                        )}
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor="end_date">End Date <span className="text-destructive">*</span></Label>
                        <Input
                            id="end_date"
                            type="date"
                            value={data.end_date}
                            onChange={(e) => setData("end_date", e.target.value)}
                            className={errors.end_date ? "border-destructive" : ""}
                            min={data.start_date}
                            required
                        />
                        {errors.end_date ? (
                            <p className="text-xs text-destructive">{errors.end_date}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">When the coupon expires and can no longer be used</p>
                        )}
                        </div>

                        {data.code && data.value && (
                        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                            <div className="flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-primary" />
                            <div>
                                <p className="font-mono font-semibold text-foreground">{data.code}</p>
                                <p className="text-sm text-muted-foreground">
                                {data.type === "percentage" ? `${data.value}% off` : `$${data.value} off`}
                                </p>
                            </div>
                            </div>
                        </div>
                        )}
                    </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={handleCancel} className="px-8 bg-transparent">
                    Cancel
                    </Button>
                    <Button 
                        disabled={processing}
                        type="submit" 
                        className="px-8 bg-primary hover:bg-primary/90"
                    >
                    Create Guest
                    </Button>
                </div>
            </form>
            </div>
        </AppLayout>
    );
}
