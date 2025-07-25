'use client';

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import NotFound from '@/app/not-found';
import { FormContainer } from "@whilter/forms";
import type { VoiceCloneFormInitialValues, VoiceCloneFormValues } from "@/types";
import { toolComponentRegistry, type ToolSlug } from "@/lib/toolComponentRegistry";
import { getToolDefaultValues } from "@/lib/getDefaultToolValues";
import { cleanVoiceCloneFormData, validateVoiceCloneFormData } from '@/utils/validations/voiceCloneValidations';
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";
import { toast } from "sonner";
import { useState } from "react";

export default function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate tool existence
  const tool = getToolBySlug(toolSlug);
  if (!tool) return <NotFound />;

  // Get components from registry
  const componentConfig = toolComponentRegistry[toolSlug as ToolSlug];
  if (!componentConfig) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(toolSlug, 'new');

  const defaultValues = getToolDefaultValues(toolSlug);

  const onSubmit = async (data: VoiceCloneFormInitialValues) => {
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);

    // Show loading toast
    const loadingToastId = toast.loading("Processing your request...");

    try {
      // Validate the form data
      const validationResult = validateVoiceCloneFormData(data);
      if (!validationResult.isValid) {
        console.error('Validation errors:', validationResult.errors);

        // Dismiss loading toast
        toast.dismiss(loadingToastId);

        // Show validation errors
        if (validationResult.errors.length === 1) {
          // Single error - show as error toast
          toast.error("Validation Error", {
            description: validationResult.errors[0],
          });
        } else {
          // Multiple errors - show as error with list
          toast.error("Please fix the following errors:", {
            description: validationResult.errors.join(" • "),
          });
        }
        return;
      }

      // Clean the data according to the discriminated union
      const cleanedData: VoiceCloneFormValues = cleanVoiceCloneFormData(data);
      console.log('Cleaned form data:', cleanedData);

      // Make your API call with the cleaned data
      const response = await fetch('/api/voice-clone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Request failed with status ${response.status}`;

        toast.error("Submission Failed", {
          description: errorMessage,
        });
        return;
      }

      const result = await response.json();
      console.log('Success:', result);

      // Show success toast
      toast.success("Voice Clone Generated!", {
        description: "Your speech has been successfully generated.",
        action: {
          label: "View",
          onClick: () => {
            // Navigate to result page or open result modal
            console.log("Navigate to result:", result);
          }
        }
      });

    } catch (error) {
      console.error('Submission error:', error);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Show generic error toast
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const PanelComponent = componentConfig.panel;
  const ControlsComponent = componentConfig.controls;

  return (
    <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
      <PageClientLayout
        breadcrumbs={breadcrumbs}
        heading={tool.title}
        description={tool.description}
        config={pageLayoutPresets.dashboard}
      >
        <div className="flex flex-col min-h-screen gap-2">
          <div className="flex flex-col flex-1 gap-3 md:gap-4">
            <div className="grid gap-3 lg:gap-8 flex-1 grid-cols-1 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8 flex flex-col min-h-[500px] bg-transparent">
                <PanelComponent />
              </div>
              <div className="lg:col-span-4 p-6 md:p-6 flex flex-col min-h-[500px] h-full bg-gradient-to-b from-blue-400 to-blue-800 shadow-sm rounded-[1rem] lg:sticky lg:top-2 lg:self-start lg:h-auto">
                <ControlsComponent />
              </div>
            </div>
          </div>
        </div>
      </PageClientLayout>
    </FormContainer>
  );
}