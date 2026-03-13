import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientInfo } from '@/types';
import { indianStates } from '@/data/states';
import { districtsByState } from '@/data/districts';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface PatientInfoFormProps {
  patientInfo: PatientInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  states?: string[];
  districtsByStateMap?: Record<string, string[]>;
}

export function PatientInfoForm({ patientInfo, setPatientInfo, states, districtsByStateMap }: PatientInfoFormProps) {
  const effectiveStates = states && states.length ? states : indianStates;
  const effectiveDistrictsByState = districtsByStateMap && Object.keys(districtsByStateMap).length
    ? districtsByStateMap
    : districtsByState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'durationDays' || name === 'year'
        ? (value === '' ? '' : Number(value))
        : value
    }));
  };

  const handleSelectChange = (name: keyof PatientInfo) => (value: string) => {
    setPatientInfo(prev => ({ ...prev, [name]: value }));
    if (name === 'state') {
      setPatientInfo(prev => ({ ...prev, district: '' }));
    }
  };

  const availableDistricts = useMemo(() => {
    return patientInfo.state ? effectiveDistrictsByState[patientInfo.state] || [] : [];
  }, [effectiveDistrictsByState, patientInfo.state]);

  const isDistrictDisabled = !patientInfo.state || availableDistricts.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="border-b pb-3 text-lg font-semibold">Patient Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" min="0" placeholder="e.g., 25" value={patientInfo.age} onChange={handleInputChange} />
            <p className="text-xs text-muted-foreground">Values &lt; 1 treated as months.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sex">Sex</Label>
            <Select onValueChange={handleSelectChange('sex')} value={patientInfo.sex || undefined}>
              <SelectTrigger><SelectValue placeholder="Select sex" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="patientType">Patient Type</Label>
          <Select onValueChange={handleSelectChange('patientType')} value={patientInfo.patientType || undefined}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Inpatient">Inpatient</SelectItem>
              <SelectItem value="Outpatient">Outpatient</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="durationDays">Duration of Illness (days)</Label>
          <Input id="durationDays" name="durationDays" type="number" min="1" placeholder="e.g., 5" value={patientInfo.durationDays} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Select onValueChange={handleSelectChange('state')} value={patientInfo.state || undefined}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {effectiveStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="district">District</Label>
            <Select onValueChange={handleSelectChange('district')} value={patientInfo.district || undefined} disabled={isDistrictDisabled}>
              <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
              <SelectContent>
                {availableDistricts.map(district => <SelectItem key={district} value={district}>{district}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Month</Label>
            <Select onValueChange={handleSelectChange('month')} value={patientInfo.month || undefined}>
              <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
              <SelectContent>
                {months.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" placeholder="e.g., 2024" value={patientInfo.year} onChange={handleInputChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
