/**
 * =============================================================================
 * REPORT ISSUE FORM COMPONENT
 * =============================================================================
 * Interactive form for issue submission with validation feedback.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createIssueAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ISSUE_CATEGORIES, PRIORITY_LEVELS } from '@/lib/validations/issue';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LocationInfo {
    hostel: string;
    block?: string;
    room?: string;
}

// Priority descriptions and colors
const priorityInfo = {
    low: { label: 'Low', description: 'Minor issue, no urgency', color: 'bg-slate-500' },
    medium: { label: 'Medium', description: 'Standard priority', color: 'bg-yellow-500' },
    high: { label: 'High', description: 'Needs attention soon', color: 'bg-orange-500' },
    emergency: { label: 'Emergency', description: 'Critical - immediate action needed', color: 'bg-red-500' },
};

// Submit button with loading state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                'Submit Issue'
            )}
        </Button>
    );
}

export function ReportIssueForm({ location }: { location: LocationInfo }) {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');

    async function handleSubmit(formData: FormData) {
        setError(null);
        setFieldErrors({});

        // Add hidden fields
        formData.set('hostel', location.hostel);
        if (location.block) formData.set('block', location.block);
        if (location.room) formData.set('room', location.room);
        formData.set('visibility', visibility);

        const result = await createIssueAction(formData);

        if (!result.success) {
            setError(result.error || 'Failed to submit issue');
            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }
        }
        // If successful, the action will redirect to the issue page
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Global Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Brief description of the issue"
                    required
                    maxLength={100}
                />
                {fieldErrors.title && (
                    <p className="text-sm text-destructive">{fieldErrors.title[0]}</p>
                )}
            </div>

            {/* Category & Priority Row */}
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select name="category" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {ISSUE_CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldErrors.category && (
                        <p className="text-sm text-destructive">{fieldErrors.category[0]}</p>
                    )}
                </div>

                {/* Priority */}
                <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Select name="priority" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            {PRIORITY_LEVELS.map((level) => (
                                <SelectItem key={level} value={level}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${priorityInfo[level].color}`} />
                                        <span>{priorityInfo[level].label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            - {priorityInfo[level].description}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldErrors.priority && (
                        <p className="text-sm text-destructive">{fieldErrors.priority[0]}</p>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide detailed information about the issue. Include specifics like when it started, how it affects you, and any other relevant details."
                    rows={5}
                    required
                    maxLength={2000}
                />
                {fieldErrors.description && (
                    <p className="text-sm text-destructive">{fieldErrors.description[0]}</p>
                )}
            </div>

            {/* Visibility Toggle */}
            <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant={visibility === 'public' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVisibility('public')}
                        className="flex-1"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Public
                    </Button>
                    <Button
                        type="button"
                        variant={visibility === 'private' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setVisibility('private')}
                        className="flex-1"
                    >
                        <EyeOff className="mr-2 h-4 w-4" />
                        Private
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    {visibility === 'public'
                        ? 'Other students can see and comment on this issue.'
                        : 'Only you and hostel management can see this issue.'}
                </p>
            </div>

            {/* Submit Button */}
            <SubmitButton />
        </form>
    );
}
